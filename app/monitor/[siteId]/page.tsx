import { notFound } from "next/navigation"
import { getSite } from "@/lib/sites"
import { Card } from "@/components/ui/card"

async function getData(siteId: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? ""
  const [indicesRes, soilRes, climateRes] = await Promise.all([
    fetch(`${base}/api/monitor/indices?siteId=${siteId}`, { cache: "no-store" }),
    fetch(`${base}/api/monitor/soil?siteId=${siteId}`, { cache: "no-store" }),
    fetch(`${base}/api/monitor/climate?siteId=${siteId}`, { cache: "no-store" }),
  ])
  const indices = await indicesRes.json().catch(() => ({}))
  const soil = await soilRes.json().catch(() => ({}))
  const climate = await climateRes.json().catch(() => ({}))
  return { indices, soil, climate }
}

export default async function MonitorPage({ params }: { params: { siteId: string } }) {
  const site = getSite(params.siteId)
  if (!site) {
    notFound()
  }
  const { indices, soil, climate } = await getData(params.siteId)
  const snap = indices?.snapshot

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">{site?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">NDVI</div>
          <div className="text-2xl font-bold">{snap?.ndvi ?? "—"}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">NDMI</div>
          <div className="text-2xl font-bold">{snap?.ndmi ?? "—"}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">EVI</div>
          <div className="text-2xl font-bold">{snap?.evi ?? "—"}</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Soil pH</div>
          <div className="text-2xl font-bold">{soil?.soil?.mean_soil_ph ?? "—"}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Clay %</div>
          <div className="text-2xl font-bold">{soil?.soil?.mean_clay_percent ?? "—"}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Sand %</div>
          <div className="text-2xl font-bold">{soil?.soil?.mean_sand_percent ?? "—"}</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Annual Avg Temp (°C)</div>
          <div className="text-2xl font-bold">{climate?.climate?.annual_avg_temperature_celsius ?? "—"}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Annual Precipitation (mm)</div>
          <div className="text-2xl font-bold">{climate?.climate?.annual_precipitation_mm ?? "—"}</div>
        </Card>
      </div>
    </div>
  )
}



