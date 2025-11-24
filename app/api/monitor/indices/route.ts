export const runtime = "nodejs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAllIndices } from "@/lib/antugrow"
import { getSite } from "@/lib/sites"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get("siteId") || undefined
    const start_date = searchParams.get("start_date") || undefined
    const end_date = searchParams.get("end_date") || undefined
    const cloud_max = searchParams.get("cloud_max") ? Number(searchParams.get("cloud_max")) : undefined

    if (!siteId) {
      return NextResponse.json({ error: "Missing siteId" }, { status: 400 })
    }
    const siteCfg = getSite(siteId)
    if (!siteCfg) {
      return NextResponse.json({ error: `Unknown siteId ${siteId}` }, { status: 404 })
    }

    // Ensure site exists in DB
    await prisma.site.upsert({
      where: { id: siteId },
      create: {
        id: siteCfg.id,
        name: siteCfg.name,
        lat: siteCfg.lat,
        lng: siteCfg.lng,
        bboxJson: siteCfg.bbox ? JSON.stringify(siteCfg.bbox) : null,
      },
      update: {
        name: siteCfg.name,
        lat: siteCfg.lat,
        lng: siteCfg.lng,
        bboxJson: siteCfg.bbox ? JSON.stringify(siteCfg.bbox) : null,
      },
    })

    const coords =
      siteCfg.bbox && siteCfg.bbox.length > 0
        ? { bbox: siteCfg.bbox }
        : { lat: siteCfg.lat, lng: siteCfg.lng }

    const data = await getAllIndices(coords as any, start_date, end_date, cloud_max)

    // Persist snapshot
    const tsStr =
      data.ndvi?.timestamp ||
      data.evi?.timestamp ||
      data.ndmi?.timestamp ||
      data.ndwi?.timestamp ||
      data.savi?.timestamp ||
      data.gndvi?.timestamp ||
      data.nbr?.timestamp
    const timestamp = tsStr ? new Date(tsStr) : new Date()

    const snapshot = await prisma.indexSnapshot.create({
      data: {
        siteId,
        timestamp,
        ndvi: data.ndvi?.ndvi,
        evi: data.evi?.evi,
        gndvi: data.gndvi?.gndvi,
        ndmi: data.ndmi?.ndmi,
        ndwi: data.ndwi?.ndwi,
        savi: data.savi?.savi,
        nbr: data.nbr?.nbr,
      },
    })

    return NextResponse.json({ snapshot })
  } catch (e: any) {
    console.error("/api/monitor/indices error", e)
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}



