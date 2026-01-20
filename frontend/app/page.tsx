'use client'

import { useState } from 'react'
import { QueryInput } from '../components/query-input'
import { ResultsDisplay } from '../components/results-display'
import { Header } from '../components/header'

export default function Home() {
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleQuery = async (query: string) => {
    setIsLoading(true)
    setError('')
    setResults(null)

    try {
      // Make request to your Python FastAPI backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analysis')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <QueryInput onSubmit={handleQuery} isLoading={isLoading} />
        {error && (
          <div className="mt-8 rounded-lg bg-destructive/10 p-4 text-destructive">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        {results && <ResultsDisplay results={results} />}
      </div>
    </main>
  )
}
