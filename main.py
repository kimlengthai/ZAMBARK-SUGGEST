import json
import motor.motor_asyncio
import uvicorn
from bson import ObjectId, json_util
from dotenv import dotenv_values
from fastapi import FastAPI, Body, HTTPException, status, Query
from fastapi.encoders import jsonable_encoder
from fastapi.responses import Response, JSONResponse
from typing import Annotated

config = dotenv_values(".env")
app = FastAPI()
client = motor.motor_asyncio.AsyncIOMotorClient(config["ATLAS_URI"])
db = client["CourseRecommendationSystem"]
subjects = db["subjects"]

@app.get("/subjects/")
async def get_subject(availbility: str | None = None, discipline: str | None = None, interests: Annotated[list[str] | None, Query()] = None):
    result = await subjects.aggregate([
        {"$match": {"interests": {"$in": interests}}},
        {"$project": {
            "code": 1,
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
    ]).to_list(length=None)
    return JSONResponse(status_code=status.HTTP_200_OK, content=json.loads(json_util.dumps(result)))