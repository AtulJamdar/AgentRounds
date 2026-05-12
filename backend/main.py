from fastapi import FastAPI

# Initialize the FastAPI app
app = FastAPI(title="Backend Service")

@app.get("/health")
async def health_check():
    """
    Standard health check endpoint.
    Returns a simple JSON status.
    """
    return {"status": "ok"}