'use client'

import { useState } from 'react'
import { QueryInput } from '../components/query-input'

export default function Home() {
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleResearchSubmit = async (query: string) => {
    setIsLoading(true)
    setAnswer('')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/research`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })

      const data = await res.json()
      setAnswer(data.answer || 'No answer returned')
    } catch (err) {
      console.error(err)
      setAnswer('Error fetching the answer')
    }

    setIsLoading(false)
  }

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Research Agent</h1>
      <p className="text-sm text-muted-foreground">
        Submit any research topic and get a comprehensive analysis with key findings.
      </p>

      {/* Your input component */}
      <QueryInput onSubmit={handleResearchSubmit} isLoading={isLoading} />

      {/* Display the answer */}
      {answer && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="font-semibold text-lg">Answer:</h2>
          <p className="mt-2">{answer}</p>
        </div>
      )}
    </main>
  )
}
