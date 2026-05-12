from pydantic import BaseModel
from typing import List

class Patient(BaseModel):
    name: str
    age: int
    conditions: List[str]
    medications: List[str]