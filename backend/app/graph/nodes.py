from app.services.llm import get_llm

llm = get_llm()

def risk_agent_node(state):
    patient = state["patient"]
    prompt = (
        f"You are a Cardiovascular Risk Specialist. Analyze: {patient['name']}, {patient['age']}yo, "
        f"conditions: {patient['conditions']}. Provide a 1-sentence risk level and reason."
    )
    res = llm.invoke(prompt)
    
    # Update state: append your result and update the logs
    new_logs = state["logs"] + ["Risk Agent: Analysis complete."]
    return {"risk_output": res.content, "logs": new_logs}

def medication_agent_node(state):
    patient = state["patient"]
    # Task 10: Medication Agent logic
    prompt = (
        f"You are a Clinical Pharmacist. Check these medications for interactions or issues: {patient['medications']}. "
        f"The Risk Agent also noted: {state['risk_output']}. Provide a 1-sentence finding."
    )
    res = llm.invoke(prompt)
    
    new_logs = state["logs"] + ["Medication Agent: Interaction scan complete."]
    return {"med_output": res.content, "logs": new_logs}

def chief_agent_node(state):
    # Task 12: The Chief Agent (The Integrator)
    prompt = (
        "You are the Chief Medical Officer. Synthesize these two reports into one final, "
        "concise recommendation for the clinical team:\n"
        f"Risk: {state['risk_output']}\n"
        f"Medications: {state['med_output']}"
    )
    res = llm.invoke(prompt)
    
    new_logs = state["logs"] + ["Chief Agent: Final synthesis delivered."]
    return {"final_recommendation": res.content, "logs": new_logs}