from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List 

app = FastAPI(title="Backend Service")

# Define the data Structure
class Patient(BaseModel):
    name: str
    age: int
    conditions: List[str]
    medications: List[str]

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

# Task 8: The Risk Agent (Rule-Based Logic)
@app.post("/analyze-risk")
async def analyze_risk(patient: Patient):
    """
    Analyzes patient risk based on hardcoded medical logic.
    """
    # Normalize conditions to lowercase for matching
    conditions_set = {c.lower() for c in patient.conditions}
    
    # Simple Deterministic Rules
    if "diabetes" in conditions_set and "hypertension" in conditions_set:
        risk_level = "high"
        reason = "Combination of elevated BP + diabetes increases cardiovascular risk."
    elif len(conditions_set) > 0:
        risk_level = "medium"
        reason = "Existing chronic conditions require regular monitoring."
    else:
        risk_level = "low"
        reason = "No major chronic conditions detected."

    return {
        "risk": risk_level,
        "reason": reason,
        "agent": "Risk Assessment Agent v1.0"
    }