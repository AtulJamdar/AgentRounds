from langgraph.graph import StateGraph, END
from app.graph.state import AgentState
from app.graph.nodes import risk_agent_node, medication_agent_node, chief_agent_node

def create_graph():
    workflow = StateGraph(AgentState)
    
    # Add the nodes
    workflow.add_node("risk_agent", risk_agent_node)
    workflow.add_node("med_agent", medication_agent_node)
    workflow.add_node("chief_agent", chief_agent_node)

    # Define the edges (The "Mesh" part)
    workflow.set_entry_point("risk_agent")
    workflow.add_edge("risk_agent", "med_agent")
    workflow.add_edge("med_agent", "chief_agent")
    workflow.add_edge("chief_agent", END)
    
    return workflow.compile()