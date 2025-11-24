export const runtime = "nodejs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getPrecipitation, getTemperature } from "@/lib/antugrow"
import { getSite } from "@/lib/sites"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get("siteId") || undefined
    const years = searchParams.get("years") ? Number(searchParams.get("years")) : 1
    const buffer = searchParams.get("buffer") ? Number(searchParams.get("buffer")) : 5000

    if (!siteId) {
      return NextResponse.json({ error: "Missing siteId" }, { status: 400 })
    }
    const siteCfg = getSite(siteId)
    if (!siteCfg || siteCfg.lat === undefined || siteCfg.lng === undefined) {
      return NextResponse.json({ error: `Unknown siteId or missing coords: ${siteId}` }, { status: 404 })
    }

    await prisma.site.upsert({
      where: { id: siteId },
      create: { id: siteCfg.id, name: siteCfg.name, lat: siteCfg.lat, lng: siteCfg.lng, bboxJson: siteCfg.bbox ? JSON.stringify(siteCfg.bbox) : null },
      update: { name: siteCfg.name, lat: siteCfg.lat, lng: siteCfg.lng, bboxJson: siteCfg.bbox ? JSON.stringify(siteCfg.bbox) : null },
    })

    const [temp, precip] = await Promise.all([
      getTemperature(siteCfg.lat, siteCfg.lng, years, buffer),
      getPrecipitation(siteCfg.lat, siteCfg.lng, years, buffer),
    ])

    // Store latest aggregate row for quick reference; detailed values could be normalized separately
    const climate = await prisma.climateStat.create({
      data: {
        siteId,
        year: temp.values?.[0]?.year ?? null,
        annual_avg_temperature_celsius: temp.annual_avg_temperature_celsius ?? null,
        annual_max_temperature_celsius: temp.annual_max_temperature_celsius ?? null,
        annual_min_temperature_celsius: temp.annual_min_temperature_celsius ?? null,
        annual_precipitation_mm: precip.annual_precipitation_mm ?? null,
        daily_avg_precipitation_mm: precip.daily_avg_precipitation_mm ?? null,
      },
    })

    return NextResponse.json({ climate, temperature: temp, precipitation: precip })
  } catch (e: any) {
    console.error("/api/monitor/climate error", e)
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}



