# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from openai import OpenAI

# Initialize OpenRouter / OpenAI client
client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

# Create FastAPI app
app = FastAPI()

# Enable CORS so frontend can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["https://your-frontend.vercel.app"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root route for testing
@app.get("/")
async def root():
    return {"message": "Research Agent Backend is running"}

# Research route (POST only)
@app.post("/research")
async def research(data: dict):
    query = data.get("query", "")
    if not query:
        return {"answer": "No query provided"}

    try:
        # Call OpenRouter API
        response = client.chat.completions.create(
            model="mistralai/mistral-7b-instruct:free",
            messages=[
                {"role": "system", "content": "You are a research assistant."},
                {"role": "user", "content": query}
            ]
        )
        answer = response.choices[0].message.content
    except Exception as e:
        answer = f"Error generating response: {e}"

    return {"answer": answer}

# Run locally
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
