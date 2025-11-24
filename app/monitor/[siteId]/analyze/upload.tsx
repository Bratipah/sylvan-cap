"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AnalyzeForm() {
  const [file, setFile] = useState<File | null>(null)
  const [instructions, setInstructions] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) {
      setError("Please choose an image")
      return
    }
    const fd = new FormData()
    fd.append("photo", file)
    if (instructions) fd.append("instructions", instructions)
    try {
      setLoading(true)
      setError(null)
      setResult(null)
      const res = await fetch("/api/monitor/analyze-image", { method: "POST", body: fd })
      const json = await res.json()
      if (!res.ok) {
        setError(json?.detail || json?.error || `Error ${res.status}`)
        return
      }
      const raw = json?.result?.raw_response || JSON.stringify(json)
      setResult(raw)
    } catch (e: any) {
      setError(e?.message || "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-4 space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Photo</label>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Instructions (optional)</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="e.g., focus on leaf discoloration"
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading}>{loading ? "Analyzing..." : "Analyze"}</Button>
      </form>
      {error && <div className="text-sm text-destructive">{error}</div>}
      {result && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Result</div>
          <pre className="whitespace-pre-wrap text-sm bg-muted p-3 rounded">{result}</pre>
        </div>
      )}
    </Card>
  )
}


