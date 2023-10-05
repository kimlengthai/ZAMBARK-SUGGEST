import bcrypt
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, Field, constr, EmailStr, validator

oauth2Scheme = OAuth2PasswordBearer(tokenUrl="token")

class User(BaseModel):
    username: constr(min_length=4)
    password: constr(min_length=8)
    email: EmailStr


def fake_decode_token(token):
    return User(
        username=token + "fakedecoded"
    )

async def get_current_user(token: Annotated[str, Depends(oauth2Scheme)]):
    user = fake_decode_token(token)
    return user

async def isuserdupe(username: str):
    user = await client["user-data"]["users"].find_one({"username": username})
    return user is None


async def isemaildupe(email: str):
    user = await client["user-data"]["users"].find_one({"email": email})
    return user is None


def hashedpass(password: str):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed

@app.get("/")
async def test_atlas_connection():
    try:
        await client.admin.command('ping')
        return JSONResponse(status_code=status.HTTP_200_OK, content={"detail": str(await client.server_info())})
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@app.get("/usertest/")
async def user_test(token: Annotated[str, Depends(get_current_user)]):
    return {"token": token}

async def userdata(username: str, hashed: str, email: str):
    user_data = {
        "username": username,
        "password": hashed.decode('utf-8'),
        "email": email
    }
    result = await client["user-data"]["users"].insert_one(user_data)
    if result.acknowledged:
        user_data["_id"] = str(result.inserted_id)
        return user_data
    return None

@app.post("/register/", response_model=User)
async def register_user(user_data: User):
    if not await isuserdupe(user_data.username):
        raise HTTPException(status_code=400, detail="This username is taken")


    if not await isemaildupe(user_data.email):
        raise HTTPException(status_code=400, detail="This email is already in use")

    hashed = hashedpass(user_data.password)
    created_user = await userdata(user_data.username, hashed, user_data.email)

    if created_user is True:
        return created_user

    raise HTTPException(status_code=500, detail="Failed to create user")
