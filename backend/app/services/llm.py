import os
from langchain_groq import ChatGroq
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv() 

def get_llm():
    key = os.getenv("GROQ_API_KEY")
    if not key:
        raise ValueError("GROQ_API_KEY is not set in environment variables")

    return ChatGroq(
        temperature=0,
        model_name="llama-3.3-70b-versatile",
        groq_api_key=key
    )