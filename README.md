# Research Agent

An AI-powered research and analysis agent that synthesizes information and provides comprehensive insights on any topic.

## Features

- Submit research queries and receive comprehensive analysis
- Key findings, recommendations, and source citations
- Powered by free Hugging Face models (no API keys required)
- Modern Next.js frontend with Tailwind CSS
- FastAPI backend with CORS support

## Project Structure

```
research-agent/
├── backend/                 # Python FastAPI backend
│   ├── main.py             # Main FastAPI application
│   └── requirements.txt    # Python dependencies
├── frontend/                # Next.js frontend
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   ├── lib/                # Utility functions
│   └── package.json        # Node.js dependencies
├── API_SPEC.md             # API documentation
└── README.md               # This file
```

## Setup

### Backend

1. Navigate to the backend directory:
   ```bash
   cd research-agent/backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the backend:
   ```bash
   python main.py
   ```

The backend will start on `http://localhost:8000`.

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd research-agent/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:3000`.

## Usage

1. Start both backend and frontend as described above.
2. Open `http://localhost:3000` in your browser.
3. Enter a research query or click on one of the example buttons.
4. View the comprehensive analysis results.

## API

The backend provides a single endpoint:

- `POST /analyze` - Analyze a research query

Request body:
```json
{
  "query": "Your research question here"
}
```

Response:
```json
{
  "summary": "Comprehensive analysis summary",
  "key_findings": ["Finding 1", "Finding 2"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "sources": ["Source 1", "Source 2"],
  "analysis_depth": "comprehensive",
  "confidence_score": 0.85
}
```

## Deployment

### Backend

Deploy the FastAPI backend to a Python hosting service like Railway, Fly.io, or Render.

### Frontend

Deploy the Next.js frontend to Vercel:

1. Push the code to GitHub.
2. Connect your repository to Vercel.
3. Set the `NEXT_PUBLIC_API_URL` environment variable to your deployed backend URL.

## License

This project is open source and available under the MIT License.
