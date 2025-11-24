import { ANTUGROW_API_KEY, requireEnv } from "./env"

export type IndexName = "NDVI" | "GNDVI" | "AQI" | "NBR" | "NDWI" | "NDMI" | "EVI" | "SAVI"

type Coords = { lat?: number; lng?: number; bbox?: [number, number][] }

export type Timestamped<T> = T & { timestamp: string }

export type IndicesResponse = {
  ndvi?: Timestamped<{ ndvi: number }>
  gndvi?: Timestamped<{ gndvi: number }>
  evi?: Timestamped<{ evi: number }>
  ndmi?: Timestamped<{ ndmi: number }>
  ndwi?: Timestamped<{ ndwi: number }>
  savi?: Timestamped<{ savi: number }>
  nbr?: Timestamped<{ nbr: number }>
}

const BASE = "https://api.antugrow.com/v1"

async function fetchAntugrow<T>(path: string, params?: Record<string, any>): Promise<T> {
  const apiKey = ANTUGROW_API_KEY ?? requireEnv("ANTUGROW_API_KEY")
  const url = new URL(`${BASE}/${path}`)
  for (const [k, v] of Object.entries(params || {})) {
    if (v === undefined || v === null) continue
    if (Array.isArray(v)) {
      for (const vi of v) url.searchParams.append(k, String(vi))
    } else {
      url.searchParams.append(k, String(v))
    }
  }
  const res = await fetch(url.toString(), {
    headers: { "X-API-KEY": apiKey },
    // Revalidate on demand from server routes
    cache: "no-store",
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`AntuGrow ${path} ${res.status}: ${text}`)
  }
  return (await res.json()) as T
}

export async function getAllIndices(
  coords: Coords,
  start_date?: string,
  end_date?: string,
  cloud_max?: number
): Promise<IndicesResponse> {
  const data: IndexName[] = ["NDVI", "GNDVI", "NDMI", "NDWI", "EVI", "SAVI", "NBR"]
  const params: Record<string, any> = { data }
  if (coords.lat !== undefined) params.lat = coords.lat
  if (coords.lng !== undefined) params.lng = coords.lng
  if (coords.bbox) params.bbox = JSON.stringify(coords.bbox)
  if (start_date) params.start_date = start_date
  if (end_date) params.end_date = end_date
  if (cloud_max !== undefined) params.cloud_max = cloud_max
  return fetchAntugrow<IndicesResponse>("all", params)
}

export async function getAQI(lat: number, lng: number, start_date: string, end_date: string, buffer?: number) {
  return fetchAntugrow<Timestamped<{ aqi: number }>>("aqi", { lat, lng, start_date, end_date, buffer })
}

export async function getSoilPh(lat: number, lng: number) {
  return fetchAntugrow<{ mean_soil_ph: number }>("soil-ph", { lat, lng })
}

export async function getClay(lat: number, lng: number) {
  return fetchAntugrow<{ mean_clay_percent: number }>("clay", { lat, lng })
}

export async function getSand(lat: number, lng: number) {
  return fetchAntugrow<{ mean_sand_percent: number }>("sand", { lat, lng })
}

export async function getTemperature(lat: number, lng: number, years = 1, buffer = 5000) {
  return fetchAntugrow<{
    annual_avg_temperature_celsius: number
    annual_max_temperature_celsius: number
    annual_min_temperature_celsius: number
    values: {
      year: number
      annual_avg_temperature_celsius: number
      annual_max_temperature_celsius: number
      annual_min_temperature_celsius: number
    }[]
    year_range_used: string
  }>("temperature", { lat, lng, years, buffer })
}

export async function getPrecipitation(lat: number, lng: number, years = 1, buffer = 5000) {
  return fetchAntugrow<{
    annual_precipitation_mm: number
    daily_avg_precipitation_mm: number
    values: { year: number; annual_precipitation_mm: number }[]
    year_range_used: string
  }>("precipitation", { lat, lng, years, buffer })
}

export async function sendSms(phone_number: string, message: string) {
  const apiKey = ANTUGROW_API_KEY ?? requireEnv("ANTUGROW_API_KEY")
  const res = await fetch(`${BASE}/send-sms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify({ phone_number, message }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`AntuGrow send-sms ${res.status}: ${text}`)
  }
  return res.json()
}


