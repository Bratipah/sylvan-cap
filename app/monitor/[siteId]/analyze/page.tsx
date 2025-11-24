import AnalyzeForm from "./upload"
import { getSite } from "@/lib/sites"
import { notFound } from "next/navigation"

export default function AnalyzeImagePage({ params }: { params: { siteId: string } }) {
  const site = getSite(params.siteId)
  if (!site) notFound()
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">AI Image Analysis - {site.name}</h1>
      <p className="text-sm text-muted-foreground">Upload a crop/tree image. The analysis runs via AntuGrow.</p>
      <AnalyzeForm />
    </div>
  )
}


