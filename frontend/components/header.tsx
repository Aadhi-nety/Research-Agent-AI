'use client'

import { Brain } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg bg-primary p-2">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Research Agent</h1>
            <p className="text-sm text-muted-foreground">
              Powered by advanced AI analysis
            </p>
          </div>
        </div>
        <p className="text-base text-muted-foreground">
          Submit any research topic and get comprehensive analysis with key findings,
          recommendations, and source citations.
        </p>
      </div>
    </header>
  )
}
