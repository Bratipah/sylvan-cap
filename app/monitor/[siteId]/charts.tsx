\"use client\"
import { useEffect, useState } from \"react\"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from \"recharts\"
import { Card } from \"@/components/ui/card\"

type HistoryPoint = {
  timestamp: string
  ndvi?: number | null
  ndmi?: number | null
  evi?: number | null
}

export default function MonitorCharts({ siteId }: { siteId: string }) {
  const [data, setData] = useState<HistoryPoint[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [aqiData, setAqiData] = useState<{ timestamp: string; aqi: number }[]>([])
  const [aqiError, setAqiError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`/api/monitor/history?siteId=${encodeURIComponent(siteId)}&days=120`, { cache: \"no-store\" })
        if (!res.ok) throw new Error(`History ${res.status}`)
        const json = await res.json()
        if (!ignore) {
          setData(json.points || [])
        }
      } catch (e: any) {
        if (!ignore) setError(e?.message || \"Failed to load history\")
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [siteId])

  useEffect(() => {
    let ignore = false
    async function loadAqi() {
      try {
        setAqiError(null)
        const res = await fetch(`/api/monitor/aqi-history?siteId=${encodeURIComponent(siteId)}&days=120`, { cache: \"no-store\" })
        if (!res.ok) throw new Error(`AQI history ${res.status}`)
        const json = await res.json()
        if (!ignore) {
          setAqiData(json.points || [])
        }
      } catch (e: any) {
        if (!ignore) setAqiError(e?.message || \"Failed to load AQI history\")
      }
    }
    loadAqi()
    return () => { ignore = true }
  }, [siteId])

  return (
    <div className=\"space-y-4\">
      <h2 className=\"text-xl font-semibold\">Vegetation indices (last 120 days)</h2>
      <Card className=\"p-4\">
        {loading ? (
          <div className=\"text-sm text-muted-foreground\">Loading…</div>
        ) : error ? (
          <div className=\"text-sm text-destructive\">{error}</div>
        ) : data.length === 0 ? (
          <div className=\"text-sm text-muted-foreground\">No history available yet.</div>
        ) : (
          <div className=\"h-80\">
            <ResponsiveContainer width=\"100%\" height=\"100%\">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray=\"3 3\" />
                <XAxis
                  dataKey=\"timestamp\"
                  tickFormatter={(v) => new Date(v).toLocaleDateString()}
                  minTickGap={24}
                />
                <YAxis domain={[0, 1]} />
                <Tooltip
                  labelFormatter={(v) => new Date(v as string).toLocaleString()}
                />
                <Legend />
                <Line type=\"monotone\" dataKey=\"ndvi\" name=\"NDVI\" stroke=\"#16a34a\" dot={false} strokeWidth={2} />
                <Line type=\"monotone\" dataKey=\"ndmi\" name=\"NDMI\" stroke=\"#2563eb\" dot={false} strokeWidth={2} />
                <Line type=\"monotone\" dataKey=\"evi\" name=\"EVI\" stroke=\"#f59e0b\" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      <h2 className=\"text-xl font-semibold\">AQI (last 120 days)</h2>
      <Card className=\"p-4\">
        {aqiError ? (
          <div className=\"text-sm text-destructive\">{aqiError}</div>
        ) : aqiData.length === 0 ? (
          <div className=\"text-sm text-muted-foreground\">No AQI history available yet.</div>
        ) : (
          <div className=\"h-80\">
            <ResponsiveContainer width=\"100%\" height=\"100%\">
              <LineChart data={aqiData}>
                <CartesianGrid strokeDasharray=\"3 3\" />
                <XAxis
                  dataKey=\"timestamp\"
                  tickFormatter={(v) => new Date(v).toLocaleDateString()}
                  minTickGap={24}
                />
                <YAxis domain={[0, 500]} />
                <Tooltip
                  labelFormatter={(v) => new Date(v as string).toLocaleString()}
                />
                <Legend />
                <Line type=\"monotone\" dataKey=\"aqi\" name=\"AQI\" stroke=\"#dc2626\" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </div>
  )
}


