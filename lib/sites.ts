export type SiteConfig = {
  id: string
  name: string
  lat?: number
  lng?: number
  bbox?: [number, number][] // [[lng, lat], ...]
}

// Seed with a couple of example sites; update with your actual trees/plots
export const SITES: SiteConfig[] = [
  { id: "demo-1", name: "Demo Site 1 (Nairobi)", lat: -1.286389, lng: 36.817223 },
  { id: "demo-2", name: "Demo Site 2 (Kisumu)", lat: -0.091702, lng: 34.7680 },
]

export function getSite(siteId: string): SiteConfig | undefined {
  return SITES.find(s => s.id === siteId)
}



