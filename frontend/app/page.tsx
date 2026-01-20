'use client'

import { useState } from 'react'
import { QueryInput } from '../components/query-input'
import { ResultsDisplay } from '../components/results-display'
import { Header } from '../components/header'

// Define the structure of your backend response
interface AnalysisResult {
  summary: string
  key_findings: string[]
  recommendations: string[]
  sources: string[]
  analysis_depth: string
  confidence_score: number
}

export default function Home() {
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleQuery = async (query: string) => {
    setIsLoading(true)
    setError('')
    setResults(null)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/analyze`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        }
      )

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data: AnalysisResult = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analysis')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto max-w-4xl px-4 py-16 space-y-8">
        {/* Query Input */}
        <QueryInput onSubmit={handleQuery} isLoading={isLoading} />

        {/* Error Message */}
        {error && (
          <div className="rounded-lg bg-red-100 p-4 text-red-700">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Results */}
        {results && <ResultsDisplay results={results} />}
      </div>
    </main>
  )
}
