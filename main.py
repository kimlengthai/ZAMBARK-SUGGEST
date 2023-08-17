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
async def get_course_test():
    courses = await db["Courses"].find().to_list(2)
    return JSONResponse(status_code=status.HTTP_200_OK, content=json.loads(json_util.dumps(courses)))