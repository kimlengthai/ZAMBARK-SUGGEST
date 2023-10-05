import json
import motor.motor_asyncio
import os
from bson import ObjectId, json_util
from dotenv import load_dotenv
from fastapi import FastAPI, Body, HTTPException, status, Query, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import Response, JSONResponse
from pydantic import BaseModel, Field, constr, EmailStr, validator
from typing import Annotated

load_dotenv()
ATLAS_URI = os.getenv("ATLAS_URI")

app = FastAPI()

client = motor.motor_asyncio.AsyncIOMotorClient(ATLAS_URI)
subjects = client["subjects"]

class Result(BaseModel):
    id: str = Field(alias="_id")
    name: str
    credits: int
    availability: list[str]
    interests: list[str]
    matches: int

@app.get("/subjects/{faculty}/", response_model=list[Result])
async def get_recommendations(faculty: str,
                              interests: Annotated[list[str], Query(min_length=3)],
                              availability: Annotated[list[str], Query()] = ["autumn", "spring", "summer"]):
    if len(result := await subjects[faculty].aggregate([
        {"$match": {"availability": {"$in": availability}}},
        {"$match": {"interests": {"$in": interests}}},
        {"$project": {
            "_id": 1,
            "name": 1,
            "credits": 1,
            "availability": 1,
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