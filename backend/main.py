from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

# Setup Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class RoastRequest(BaseModel):
    goal: str
    site: str

@app.post("/roast")
def generate_roast(request: RoastRequest):
    print(f"🔥 Roasting user for visiting {request.site} instead of {request.goal}")
    
    prompt = f"""
    You are a sarcastic, mean, but funny productivity coach.
    The user is supposed to be working on: "{request.goal}".
    Instead, they are procrastinating on: "{request.site}".
    
    TASK: Write a brutal,make it personal, one-sentence roast to make them go back to work.
    
    RULES:
    - Be savage but not hateful.
    - Use irony.
    - Keep it under 20 words.
    - Make them feel guilty about their specific goal.
    """
    
    try:
        response = model.generate_content(prompt)
        return {"roast": response.text.strip()}
    except Exception as e:
        return {"roast": "Go back to work. Even the AI is disappointed in you."}