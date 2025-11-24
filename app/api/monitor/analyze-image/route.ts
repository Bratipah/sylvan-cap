export const runtime = "nodejs"
import { NextResponse } from "next/server"
import { ANTUGROW_API_KEY, requireEnv } from "@/lib/env"

export async function POST(request: Request) {
  try {
    const apiKey = ANTUGROW_API_KEY ?? requireEnv("ANTUGROW_API_KEY")
    const incoming = await request.formData()
    const photo = incoming.get("photo")
    const instructions = incoming.get("instructions")
    if (!(photo instanceof File)) {
      return NextResponse.json({ error: "Missing 'photo' file" }, { status: 400 })
    }

    const fd = new FormData()
    fd.append("photo", photo, (photo as any).name ?? "upload.jpg")
    if (typeof instructions === "string" && instructions.length > 0) {
      fd.append("instructions", instructions)
    }

    const res = await fetch("https://api.antugrow.com/v1/analyze-image", {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
      },
      body: fd,
    })
    const text = await res.text()
    if (!res.ok) {
      return NextResponse.json({ error: `AntuGrow error ${res.status}`, detail: text }, { status: res.status })
    }
    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e: any) {
    console.error("/api/monitor/analyze-image error", e)
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}


