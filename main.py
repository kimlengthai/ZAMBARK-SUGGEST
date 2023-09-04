import json
import motor.motor_asyncio
import os
import uvicorn
from bson import ObjectId, json_util
from dotenv import load_dotenv
from fastapi import FastAPI, Body, HTTPException, status, Query
from fastapi.encoders import jsonable_encoder
from fastapi.responses import Response, JSONResponse
from typing import Annotated

load_dotenv()
ATLAS_URI = os.getenv("ATLAS_URI")

app = FastAPI()
client = motor.motor_asyncio.AsyncIOMotorClient(ATLAS_URI)
subjects = client["subjects"]

@app.get("/")
async def test_atlas_connection():
    try:
        await client.admin.command('ping')
        return JSONResponse(status_code=status.HTTP_200_OK, content={"detail": str(await client.server_info())})
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@app.get("/subjects/{faculty}/")
async def get_subject(faculty: str,
                      availability: Annotated[list[str], Query()] = ["autumn", "spring"],
                      interests: Annotated[list[str] | None, Query()] = None):
    if len(result := await subjects[faculty].aggregate([
        {"$match": {"availability": {"$in": availability}}},
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
    ]).to_list(length=None)) > 0:
        return JSONResponse(status_code=status.HTTP_200_OK, content=json.loads(json_util.dumps(result)))
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No matching courses found")