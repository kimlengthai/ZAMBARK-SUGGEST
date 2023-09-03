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
subjects = client["subjects"]

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

if __name__ == "__main__":
    uvicorn.run("main:app", port=443, log_level="info")