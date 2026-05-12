from typing import TypedDict, List

class AgentState(TypedDict):
    patient: dict
    risk_output: str
    med_output: str
    final_recommendation: str
    logs: List[str]