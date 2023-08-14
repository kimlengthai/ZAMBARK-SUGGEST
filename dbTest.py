from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

mongoUser = input("username: ")
mongoPass = input("password: ")
uri = f"mongodb+srv://{mongoUser}:{mongoPass}@flustercuck.jpx6unf.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

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