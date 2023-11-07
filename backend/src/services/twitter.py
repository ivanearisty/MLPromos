import random
from datetime import datetime as dt
import datetime
import time
from loguru import logger
from modules.model import evaluate
from database.database import db

MAX_LIST_LENGTH = 400

# Method to retrieve tweets before a specific date
async def get_tweets_before_date(target_date):
    cursor = db['tweets'].find({'date': {'$lt': target_date}})
    tweets = await cursor.to_list(length=MAX_LIST_LENGTH)
    return tweets

# async def get_all_tweets(received_data):
#     cursor = db['tweets'].find({}) 
#     tweets = await cursor.to_list(length=MAX_LIST_LENGTH)
#     return tweets

async def get_all_tweets():
    cursor = db['tweets'].find({}) 
    tweets = await cursor.to_list(length=MAX_LIST_LENGTH)
    
    # Format dates and serialize to JSON
    formatted_tweets = []

    for tweet in tweets:
        tweet_text = tweet["text"]
        evaluated_text = await evaluate(tweet_text)
        
        if evaluated_text:  # Check if evaluate returns a non-empty string
            formatted_tweets.append({
                "date": tweet["date"].isoformat(),
                "text": evaluated_text,
                # Add other properties as needed
            })
    
    return formatted_tweets


# Method to add random tweets data to the database
async def add_random_tweets_data(num_tweets):
    current_datetime = datetime.datetime.now()

    for _ in range(num_tweets):
        tweet = {
            'date': current_datetime - datetime.timedelta(days=random.randint(1, 4)),
            'text': 'Random tweet text goes here.'
        }
        await db['tweets'].insert_one(tweet)

    tweet2 = {
        'date': current_datetime - datetime.timedelta(days=random.randint(1, 4)),
        'text': 'Use code CRAZYDEAL2020 on Postmates for $15 off!!'
    }
    tweet3 = {
        'date': current_datetime - datetime.timedelta(days=random.randint(1, 4)),
        'text': 'Use code NYC40 on Postmates for $15 off, $30 minimum.'
    }
    await db['tweets'].insert_one(tweet2)
    await db['tweets'].insert_one(tweet3)

async def gen_sample_tweet() -> dict: 
    
    tweet = {
        'date': datetime.datetime.now(),
        'text': "Use code NYC40 on Postmates for $15 off, $30 minimum."
    }
    return tweet

#TODO: Implement new tweets functionality
async def get_new_tweets():
    logger.info("get new tweets polled")
    return 

async def insert_new_tweet(tweet):
    try:
        result = await db['tweets'].insert_one(tweet)
        logger.info("Tweet inserted successfully.")
    except Exception as e:
        logger.error(f"Error inserting tweet: {str(e)}")



# Usage examples:
# To retrieve tweets before a specific date:
# target_date = datetime.datetime(2023, 1, 1)
# tweets = await get_tweets_before_date(target_date)
# print(tweets)

# To add random tweets data to the database:
# num_tweets = 10
# await add_random_tweets_data(num_tweets)
