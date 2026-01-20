# Research Agent

A full-stack application for AI-powered research analysis with a FastAPI backend and Next.js frontend.

## Project Structure

```
research-agent/
├── backend/          # FastAPI backend
├── frontend/         # Next.js frontend
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   python main.py
   ```

The backend will be available at `http://localhost:8000`.

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

The frontend will be available at `http://localhost:3000`.

## Deployment

### Frontend (Vercel)

1. Go to [Vercel](https://vercel.com) and sign in.
2. Click "New Project" and import your GitHub repository.
3. Set the root directory to `frontend` (or deploy only the frontend folder).
4. Vercel will detect Next.js and build automatically.
5. In the project settings, go to "Environment Variables" and add:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: Your deployed backend URL (see below for how to find it)
6. Deploy the project.

#### How to Find the NEXT_PUBLIC_API_URL

After deploying the backend:

1. Go to your Vercel dashboard.
2. Click on the backend project.
3. The URL will be shown at the top (e.g., `https://your-project-name.vercel.app`).
4. Copy this URL and use it as the value for `NEXT_PUBLIC_API_URL` in the frontend project settings.
5. If using a different service, use the provided domain.

### Backend (Vercel)

1. Create a new Vercel project for the backend.
2. Set the root directory to `backend`.
3. Create a `vercel.json` in the backend directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "main.py"
    }
  ]
}
```

4. Ensure `requirements.txt` includes all dependencies.
5. Deploy the backend project to Vercel.
6. Note the deployed URL (e.g., `https://your-backend.vercel.app`).

### Backend (Alternative: Railway/Render)

For better Python support, consider:
- **Railway**: Import the `backend` directory, it auto-detects Python.
- **Render**: Create a web service, set build command to `pip install -r requirements.txt`, start command to `uvicorn main:app --host 0.0.0.0 --port $PORT`.

## Environment Variables

For the frontend, set:
- `NEXT_PUBLIC_API_URL`: URL of the deployed backend (e.g., `https://your-backend.vercel.app`)

## Troubleshooting

### 404 Error on Vercel

- Ensure you're deploying the `frontend` directory, not the root.
- Check that `vercel.json` is present in the frontend directory.
- Verify the build completes successfully before deployment.

### API Connection Issues

- Ensure the backend is deployed and accessible.
- Check that `NEXT_PUBLIC_API_URL` is set correctly in Vercel environment variables.
- Verify CORS settings in the backend allow the frontend domain.
