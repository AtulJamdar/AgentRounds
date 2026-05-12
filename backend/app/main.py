from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schema import Patient # Import from your new schema file
from app.graph.workflow import create_graph

app = FastAPI(title="Healthcare Agent Mesh")

origins = [
    "http://localhost:3000",
    "https://agent-rounds.vercel.app", # Add your specific Vercel URL here
]

# Initialize the Multi-Agent Graph
graph = create_graph()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok", "system": "Agent Mesh Online"}

@app.post("/analyze-risk")
async def analyze_risk(patient: Patient):
    """
    This route now triggers the Multi-Agent Workflow (LangGraph)
    instead of just a simple rule-based check.
    """
    # 1. Prepare initial state for the agents
    initial_state = {
        "patient": patient.dict(),
        "risk_output": "",
        "med_output": "",
        "final_recommendation": "",
        "logs": []
    }
    
    # 2. Invoke the Agent Mesh (Task 11)
    # This runs: Risk Agent -> Medication Agent -> Chief Agent
    final_state = graph.invoke(initial_state)
    
    # 3. Return the synthesized result from the Chief Agent
    return {
        "risk": final_state.get("risk_output"),
        "reason": final_state.get("med_output"),
        "final_report": final_state.get("final_recommendation"),
        "logs": final_state.get("logs")
    }