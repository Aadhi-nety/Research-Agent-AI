# Research & Analysis Agent - API Specification

This document defines the API endpoints your Python FastAPI backend needs to implement for the Research Agent frontend.

## Overview

The frontend communicates with your Python backend via HTTP requests. Your Pydantic AI agent should handle the research logic and return structured analysis results.

## Base URL

Development: `http://localhost:8000`
Production: Set via `NEXT_PUBLIC_API_URL` environment variable

## Endpoints

### POST /analyze

Submit a research query and receive comprehensive analysis.

**Request:**
```json
{
  "query": "What are the latest trends in artificial intelligence?"
}
```

**Response (200 OK):**
```json
{
  "summary": "A comprehensive overview of the AI trends analysis...",
  "key_findings": [
    "Finding 1",
    "Finding 2",
    "Finding 3"
  ],
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2"
  ],
  "sources": [
    "Source 1",
    "Source 2"
  ],
  "analysis_depth": "comprehensive",
  "confidence_score": 0.85
}
```

**Response Fields:**
- `summary` (string, required): Main analysis summary
- `key_findings` (array of strings): Important discoveries
- `recommendations` (array of strings): Suggested actions
- `sources` (array of strings): Referenced sources
- `analysis_depth` (string): Level of analysis ("basic", "intermediate", "comprehensive")
- `confidence_score` (number 0-1): Confidence in the analysis

## Implementation Notes

### Frontend Configuration

The frontend looks for the API URL from:
1. `process.env.NEXT_PUBLIC_API_URL` environment variable (if set)
2. Falls back to `http://localhost:8000`

To set the backend URL for production, add to your Vercel environment variables:
```
NEXT_PUBLIC_API_URL=https://your-fastapi-backend.com
```

### CORS Configuration

Your FastAPI backend must enable CORS for the frontend domain:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-vercel-domain.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Error Handling

The frontend expects HTTP status codes:
- `200`: Success
- `400`: Bad request
- `500`: Server error

Error responses will be displayed to the user as: "API error: {status_code}"

## Example Python Implementation (FastAPI)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pydantic_ai import Agent
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

class AnalysisResponse(BaseModel):
    summary: str
    key_findings: list[str]
    recommendations: list[str]
    sources: list[str]
    analysis_depth: str
    confidence_score: float

# Initialize your Pydantic AI agent with Hugging Face model
agent = Agent(
    model="huggingface/zephyr-7b-beta",  # Free model on Hugging Face
    system_prompt="You are a research analyst that provides comprehensive analysis on any topic. Provide structured responses with summary, key findings, recommendations, and sources."
)

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze(request: QueryRequest):
    # Use your Pydantic AI agent to analyze the query
    result = await agent.run(request.query)
    
    # Format and return the analysis
    return AnalysisResponse(
        summary=result.summary,
        key_findings=result.key_findings,
        recommendations=result.recommendations,
        sources=result.sources,
        analysis_depth="comprehensive",
        confidence_score=0.85
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## Deployment

1. **Frontend**: Deploy to Vercel using the "Publish" button
2. **Backend**: Deploy to a Python hosting service:
   - Railway
   - Fly.io
   - Render
   - AWS Elastic Beanstalk
   - Google Cloud Run

3. **Configuration**: After deploying, set `NEXT_PUBLIC_API_URL` in your Vercel environment variables to point to your backend URL.
