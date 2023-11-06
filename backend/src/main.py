import time
from loguru import logger
from bson.json_util import dumps
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI, WebSocket, WebSocketDisconnect

from modules.websockets import ConnectionManager
from services.twitter import get_tweets_before_date, add_random_tweets_data, get_all_tweets, insert_new_tweet, gen_sample_tweet, get_new_tweets
from database.database import db

app = FastAPI(
    title="ML Delivery App Scraper",
    description="ML Delivery App Scraper",
    version="1.0.0",
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

websockets_manager = ConnectionManager()

@app.get("/test")
async def test():
    logger.info("test endpoint invoked")
    return "Hello world"

@app.get("/addtest")
async def addtest():
    tweet = await gen_sample_tweet()
    await insert_new_tweet(tweet)
    logger.info("addtest endpoint invoked")


@app.websocket("/websocket")
async def websocket_endpoint(websocket: WebSocket):
    logger.info("websocket invoked")

    await websockets_manager.connect(websocket)
    try:
        tweets = await get_all_tweets()
        await websocket.send_json(dumps(tweets))
    
        #Implement get new tweets and logic to send new tweets to websocket when they are added
        new_tweets = await get_new_tweets()
        if new_tweets:
            await websocket.send_json({"tweets": new_tweets})
    except WebSocketDisconnect:
        await websockets_manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)