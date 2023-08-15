from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import dotenv_values

config = dotenv_values(".env")

# Create a new client and connect to the server
client = MongoClient(config["ATLAS_URI"], server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client.CourseRecommendationSystem
col = db.Courses

cursor = col.find({"interests": "programming"})
for doc in cursor:
    print(doc)