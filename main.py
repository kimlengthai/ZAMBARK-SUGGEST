import json
import motor.motor_asyncio
import uvicorn
from bson import ObjectId, json_util
from dotenv import dotenv_values
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import Response, JSONResponse

config = dotenv_values(".env")
app = FastAPI()
client = motor.motor_asyncio.AsyncIOMotorClient(config["ATLAS_URI"])
db = client.CourseRecommendationSystem

@app.get("/")
async def get_course_test(duration: int | None = None):
    if duration:
        if (courses := await db["Courses"].find_one({"duration": int(duration)})) is not None:
            return JSONResponse(status_code=status.HTTP_200_OK, content=json.loads(json_util.dumps(courses)))
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Course with duration {duration} not found")
    courses = await db["Courses"].find().to_list(2)
    return JSONResponse(status_code=status.HTTP_200_OK, content=json.loads(json_util.dumps(courses)))

@app.get("/faculty/{interest}")
async def get_course_from_interest_path_test(interest: str):
    if len(courses := await db["Courses"].find({"interests": interest}).to_list(2)) != 0:
        return JSONResponse(status_code=status.HTTP_200_OK, content=json.loads(json_util.dumps(courses)))
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Course with interest {interest} not found")