export const runtime = "nodejs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { SITES } from "@/lib/sites"
import { getAllIndices, getAQI } from "@/lib/antugrow"
import { CRON_SECRET } from "@/lib/env"

function isAuthorized(request: Request): boolean {
  const { searchParams } = new URL(request.url)
  const secretQP = searchParams.get("secret")
  const auth = request.headers.get("authorization") || ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : undefined
  const expected = CRON_SECRET || process.env.CRON_SECRET
  return Boolean(expected && (secretQP === expected || token === expected))
}

export async function GET(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const results: any[] = []
    const today = new Date()
    const end_date = today.toISOString().slice(0, 10)
    const start = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    const start_date = start.toISOString().slice(0, 10)

    for (const site of SITES) {
      // Ensure site exists
      await prisma.site.upsert({
        where: { id: site.id },
        create: {
          id: site.id,
          name: site.name,
          lat: site.lat,
          lng: site.lng,
          bboxJson: site.bbox ? JSON.stringify(site.bbox) : null,
        },
        update: {
          name: site.name,
          lat: site.lat,
          lng: site.lng,
          bboxJson: site.bbox ? JSON.stringify(site.bbox) : null,
        },
      })

      const coords = site.bbox && site.bbox.length ? { bbox: site.bbox } : { lat: site.lat, lng: site.lng }

      const [indices, aqi] = await Promise.all([
        getAllIndices(coords as any, undefined, undefined, 20),
        site.lat !== undefined && site.lng !== undefined
          ? getAQI(site.lat, site.lng, start_date, end_date, 2000)
          : Promise.resolve(undefined),
      ])

      const tsStr =
        indices.ndvi?.timestamp ||
        indices.evi?.timestamp ||
        indices.ndmi?.timestamp ||
        indices.ndwi?.timestamp ||
        indices.savi?.timestamp ||
        indices.gndvi?.timestamp ||
        indices.nbr?.timestamp
      const timestamp = tsStr ? new Date(tsStr) : new Date()

      const snap = await prisma.indexSnapshot.create({
        data: {
          siteId: site.id,
          timestamp,
          ndvi: indices.ndvi?.ndvi,
          evi: indices.evi?.evi,
          gndvi: indices.gndvi?.gndvi,
          ndmi: indices.ndmi?.ndmi,
          ndwi: indices.ndwi?.ndwi,
          savi: indices.savi?.savi,
          nbr: indices.nbr?.nbr,
        },
      })
      let aqiRow = null
      if (aqi) {
        aqiRow = await prisma.aQISnapshot.create({
          data: { siteId: site.id, timestamp: new Date(aqi.timestamp), aqi: aqi.aqi },
        })
      }
      results.push({ siteId: site.id, snapshotId: snap.id, aqiId: aqiRow?.id })
    }
    return NextResponse.json({ ok: true, results })
  } catch (e: any) {
    console.error("/api/cron/fetch-indices error", e)
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}



