export const runtime = "nodejs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSite } from "@/lib/sites"
import { sendSms } from "@/lib/antugrow"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const siteId: string | undefined = body?.siteId
    const phone: string | undefined = body?.phone_number
    const ndviMin: number = typeof body?.ndvi_min === "number" ? body.ndvi_min : 0.2
    if (!siteId) return NextResponse.json({ error: "Missing siteId" }, { status: 400 })
    const site = getSite(siteId)
    if (!site) return NextResponse.json({ error: `Unknown siteId ${siteId}` }, { status: 404 })

    // Get latest snapshot
    const latest = await prisma.indexSnapshot.findFirst({
      where: { siteId, ndvi: { not: null } },
      orderBy: { timestamp: "desc" },
    })
    if (!latest) return NextResponse.json({ error: "No snapshot available" }, { status: 404 })

    const triggers: string[] = []
    if (latest.ndvi !== null && latest.ndvi !== undefined && latest.ndvi < ndviMin) {
      triggers.push(`NDVI (${latest.ndvi.toFixed(2)}) is below threshold ${ndviMin}`)
    }

    if (triggers.length === 0) {
      return NextResponse.json({ triggered: false })
    }

    const message = `Alert ${site.name}: ${triggers.join("; ")} at ${latest.timestamp.toISOString()}`

    let smsResponse: any = null
    if (phone) {
      smsResponse = await sendSms(phone, message)
    }

    const alert = await prisma.alert.create({
      data: {
        siteId,
        type: "threshold",
        message,
        sent: Boolean(phone),
        phoneNumber: phone || null,
        channel: phone ? "sms" : null,
      },
    })

    return NextResponse.json({ triggered: true, alert, sms: smsResponse })
  } catch (e: any) {
    console.error("/api/monitor/alerts error", e)
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}



