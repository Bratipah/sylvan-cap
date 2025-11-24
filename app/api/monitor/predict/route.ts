export const runtime = "nodejs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSite } from "@/lib/sites"

function linearRegression(xs: number[], ys: number[]) {
  const n = xs.length
  const sumX = xs.reduce((a, b) => a + b, 0)
  const sumY = ys.reduce((a, b) => a + b, 0)
  const sumXY = xs.reduce((acc, x, i) => acc + x * ys[i], 0)
  const sumX2 = xs.reduce((acc, x) => acc + x * x, 0)
  const denom = n * sumX2 - sumX * sumX
  if (denom === 0) return { a: ys[ys.length - 1] || 0, b: 0 }
  const b = (n * sumXY - sumX * sumY) / denom
  const a = (sumY - b * sumX) / n
  return { a, b }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const siteId: string | undefined = body?.siteId
    const metric: "ndvi" | "evi" | "ndmi" = body?.metric || "ndvi"
    const horizonDays: number = typeof body?.horizonDays === "number" ? body.horizonDays : 7
    if (!siteId) {
      return NextResponse.json({ error: "Missing siteId" }, { status: 400 })
    }
    const siteCfg = getSite(siteId)
    if (!siteCfg) {
      return NextResponse.json({ error: `Unknown siteId ${siteId}` }, { status: 404 })
    }
    const recent = await prisma.indexSnapshot.findMany({
      where: { siteId, [metric]: { not: null } },
      orderBy: { timestamp: "asc" },
      take: 60,
    })
    if (recent.length < 3) {
      return NextResponse.json({ error: "Not enough history to forecast" }, { status: 400 })
    }
    const t0 = recent[0].timestamp.getTime()
    const dayMs = 24 * 60 * 60 * 1000
    const xs = recent.map((r) => (r.timestamp.getTime() - t0) / dayMs)
    const ys = recent.map((r) => (r[metric] as number))
    const { a, b } = linearRegression(xs, ys)

    const predictions = []
    const lastTs = recent[recent.length - 1].timestamp
    for (let d = 1; d <= horizonDays; d++) {
      const x = ((lastTs.getTime() - t0) / dayMs) + d
      const y = a + b * x
      const forDate = new Date(lastTs.getTime() + d * dayMs)
      const pred = await prisma.prediction.create({
        data: { siteId, forDate, metric, value: y },
      })
      predictions.push(pred)
    }

    return NextResponse.json({ predictions })
  } catch (e: any) {
    console.error("/api/monitor/predict error", e)
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}



