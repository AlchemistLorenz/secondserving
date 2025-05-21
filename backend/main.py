import json as j 
from utilityFun import searchNearby
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware  



app = FastAPI(title="SecondServing API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


@app.get("/")
async def root():
    return {"message": "SecondServing backend is alive!"}

@app.post("/api/wishlist")
async def root(tryThis:Request):
    p = await tryThis.json()
    searchNearby(p)  # Given a valid JSON
    print(f"Got {j.dumps(p)}")
    return {"Nice"}

