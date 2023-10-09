import json
import motor.motor_asyncio
import os
from bson import ObjectId, json_util
from dotenv import load_dotenv
from fastapi import FastAPI, Body, HTTPException, status, Query, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, JSONResponse
from mangum import Mangum
from pydantic import BaseModel, Field, constr, EmailStr, validator
from typing import Annotated

load_dotenv()
ATLAS_URI = os.getenv("ATLAS_URI")

app = FastAPI(title="Zambark CRS API", root_path="/live")
origins = ["http://zambark.vercel.app","https://zambark.vercel.app"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
handler = Mangum(app)

client = motor.motor_asyncio.AsyncIOMotorClient(ATLAS_URI)
subjects = client["subjects"]

# Commented lines represent deprecated functionality for university electives

class Result(BaseModel):
    id: str = Field(alias="_id")
    name: str
    # credits: int
    # availability: list[str]
    interests: list[str]
    matches: int

@app.get("/")
async def test_atlas_connection():
    try:
        await client.admin.command('ping')
        return JSONResponse(status_code=status.HTTP_200_OK, content={"detail": str(await client.server_info())})
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@app.get("/subjects/{faculty}/", response_model=list[Result])
async def get_recommendations(faculty: str,
                              interests: Annotated[list[str], Query(min_length=3)]):
                            #   availability: Annotated[list[str], Query()] = ["autumn", "spring", "summer"]):
    if len(result := await subjects[faculty].aggregate([
        # {"$match": {"availability": {"$in": availability}}},
        {"$match": {"interests": {"$in": interests}}},
        {"$project": {
            "_id": 1,
            "name": 1,
            # "credits": 1,
            # "availability": 1,
            "interests": 1,
            "matches": {
                "$size": {
                    "$setIntersection": [interests, "$interests"]
                }
            }
        }},
        {"$sort": {"matches": -1}}
    ]).to_list(length=3)) > 0:
        return JSONResponse(status_code=status.HTTP_200_OK, content=json.loads(json_util.dumps(result)))
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No matching courses found")