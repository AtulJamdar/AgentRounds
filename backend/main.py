from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Backend Service")

# This allows your Next.js frontend to talk to your FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace ["*"] with your actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the API"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}