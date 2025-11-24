export const runtime = "nodejs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSite } from "@/lib/sites"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get("siteId") || undefined
    const daysParam = searchParams.get("days")
    const days = daysParam ? Math.max(1, Number(daysParam)) : 90
    if (!siteId) return NextResponse.json({ error: "Missing siteId" }, { status: 400 })
    const site = getSite(siteId)
    if (!site) return NextResponse.json({ error: `Unknown siteId ${siteId}` }, { status: 404 })

    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    const rows = await prisma.indexSnapshot.findMany({
      where: { siteId, timestamp: { gte: since } },
      orderBy: { timestamp: "asc" },
      select: {
        timestamp: true,
        ndvi: true,
        evi: true,
        gndvi: true,
        ndmi: true,
        ndwi: true,
        savi: true,
        nbr: true,
      },
    })
    const points = rows.map(r => ({
      timestamp: r.timestamp.toISOString(),
      ndvi: r.ndvi,
      evi: r.evi,
      gndvi: r.gndvi,
      ndmi: r.ndmi,
      ndwi: r.ndwi,
      savi: r.savi,
      nbr: r.nbr,
    }))
    return NextResponse.json({ siteId, days, points })
  } catch (e: any) {
    console.error("/api/monitor/history error", e)
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}


