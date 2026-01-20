'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react'

interface ResultsDisplayProps {
  results: any
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const {
    summary,
    key_findings,
    sources,
    analysis_depth,
    confidence_score,
    recommendations,
  } = results

  return (
    <div className="mt-12 space-y-6 animate-in fade-in-up duration-500">
      {/* Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-foreground">{summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">
              Confidence: {Math.round((confidence_score || 0) * 100)}%
            </Badge>
            <Badge variant="outline">Depth: {analysis_depth || 'comprehensive'}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Key Findings */}
      {key_findings && key_findings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Key Findings
            </CardTitle>
            <CardDescription>Important discoveries from the analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {key_findings.map((finding: string, index: number) => (
                <div key={index} className="flex gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-foreground">{finding}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Recommendations
            </CardTitle>
            <CardDescription>Suggested actions based on findings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((rec: string, index: number) => (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-card/50 p-3"
                >
                  <p className="text-sm font-medium text-foreground">
                    Recommendation {index + 1}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sources */}
      {sources && sources.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Research Sources</CardTitle>
            <CardDescription>Sources referenced in this analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sources.map((source: string, index: number) => (
                <div key={index} className="flex gap-2 text-sm">
                  <span className="flex-shrink-0 text-muted-foreground">{index + 1}.</span>
                  <p className="text-foreground">{source}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
