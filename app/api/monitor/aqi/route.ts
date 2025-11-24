export const runtime = "nodejs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAQI } from "@/lib/antugrow"
import { getSite } from "@/lib/sites"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get("siteId") || undefined
    const start_date = searchParams.get("start_date") || undefined
    const end_date = searchParams.get("end_date") || undefined
    const buffer = searchParams.get("buffer") ? Number(searchParams.get("buffer")) : 2000

    if (!siteId) {
      return NextResponse.json({ error: "Missing siteId" }, { status: 400 })
    }
    const siteCfg = getSite(siteId)
    if (!siteCfg || siteCfg.lat === undefined || siteCfg.lng === undefined) {
      return NextResponse.json({ error: `Unknown siteId or missing coords: ${siteId}` }, { status: 404 })
    }
    if (!start_date || !end_date) {
      return NextResponse.json({ error: "start_date and end_date are required" }, { status: 400 })
    }

    await prisma.site.upsert({
      where: { id: siteId },
      create: { id: siteCfg.id, name: siteCfg.name, lat: siteCfg.lat, lng: siteCfg.lng, bboxJson: siteCfg.bbox ? JSON.stringify(siteCfg.bbox) : null },
      update: { name: siteCfg.name, lat: siteCfg.lat, lng: siteCfg.lng, bboxJson: siteCfg.bbox ? JSON.stringify(siteCfg.bbox) : null },
    })

    const aqi = await getAQI(siteCfg.lat, siteCfg.lng, start_date, end_date, buffer)

    const row = await prisma.aQISnapshot.create({
      data: {
        siteId,
        timestamp: new Date(aqi.timestamp),
        aqi: aqi.aqi,
      },
    })

    return NextResponse.json({ aqi: row })
  } catch (e: any) {
    console.error("/api/monitor/aqi error", e)
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}



