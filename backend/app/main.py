from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schema import Patient 
from app.graph.workflow import create_graph

app = FastAPI(title="Healthcare Agent Mesh")

# 1. Define specific origins
origins = [
    "http://localhost:3000",
    "https://agent-rounds.vercel.app",
]

# Initialize the Multi-Agent Graph
graph = create_graph()

# 2. FIX: Use the specific 'origins' list instead of "*"
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok", "system": "Agent Mesh Online"}

@app.post("/analyze-risk")
async def analyze_risk(patient: Patient):
    initial_state = {
        "patient": patient.dict(),
        "risk_output": "",
        "med_output": "",
        "final_recommendation": "",
        "logs": []
    }
    
    final_state = graph.invoke(initial_state)
    
    return {
        "risk": final_state.get("risk_output"),
        "reason": final_state.get("med_output"),
        "final_report": final_state.get("final_recommendation"),
        "logs": final_state.get("logs")
    }