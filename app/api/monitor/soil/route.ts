export const runtime = "nodejs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getClay, getSand, getSoilPh } from "@/lib/antugrow"
import { getSite } from "@/lib/sites"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get("siteId") || undefined
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

    const [ph, clay, sand] = await Promise.all([getSoilPh(siteCfg.lat, siteCfg.lng), getClay(siteCfg.lat, siteCfg.lng), getSand(siteCfg.lat, siteCfg.lng)])

    const soil = await prisma.soilStat.create({
      data: {
        siteId,
        mean_soil_ph: ph?.mean_soil_ph,
        mean_clay_percent: clay?.mean_clay_percent,
        mean_sand_percent: sand?.mean_sand_percent,
      },
    })

    return NextResponse.json({ soil })
  } catch (e: any) {
    console.error("/api/monitor/soil error", e)
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}



