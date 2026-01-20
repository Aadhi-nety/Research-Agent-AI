'use client'

import React from "react"

import { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { SearchIcon } from 'lucide-react'

interface QueryInputProps {
  onSubmit: (query: string) => void
  isLoading: boolean
}

export function QueryInput({ onSubmit, isLoading }: QueryInputProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSubmit(query)
      setQuery('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          What would you like to research?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Enter your research query... (e.g., 'Analyze the impact of artificial intelligence on healthcare industry')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            className="min-h-24 resize-none"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="w-full gap-2 sm:w-auto"
            >
              <SearchIcon className="h-4 w-4" />
              {isLoading ? 'Analyzing...' : 'Research'}
            </Button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          onClick={() => setQuery('What are the latest trends in artificial intelligence?')}
          disabled={isLoading}
          className="rounded-lg border border-border bg-card/50 p-3 text-left text-sm transition-colors hover:bg-card disabled:opacity-50"
        >
          <p className="font-medium text-foreground">AI Trends</p>
          <p className="text-xs text-muted-foreground">Explore latest AI developments</p>
        </button>
        <button
          onClick={() => setQuery('Analyze sustainable energy solutions for 2025')}
          disabled={isLoading}
          className="rounded-lg border border-border bg-card/50 p-3 text-left text-sm transition-colors hover:bg-card disabled:opacity-50"
        >
          <p className="font-medium text-foreground">Green Energy</p>
          <p className="text-xs text-muted-foreground">Sustainable solutions analysis</p>
        </button>
        <button
          onClick={() => setQuery('Summarize recent breakthroughs in quantum computing')}
          disabled={isLoading}
          className="rounded-lg border border-border bg-card/50 p-3 text-left text-sm transition-colors hover:bg-card disabled:opacity-50"
        >
          <p className="font-medium text-foreground">Quantum Computing</p>
          <p className="text-xs text-muted-foreground">Latest technical advances</p>
        </button>
        <button
          onClick={() => setQuery('Compare remote work productivity trends across industries')}
          disabled={isLoading}
          className="rounded-lg border border-border bg-card/50 p-3 text-left text-sm transition-colors hover:bg-card disabled:opacity-50"
        >
          <p className="font-medium text-foreground">Remote Work</p>
          <p className="text-xs text-muted-foreground">Productivity analysis</p>
        </button>
      </div>
    </div>
  )
}
