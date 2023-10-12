import random
import datetime

from database.database import db

# Method to retrieve tweets before a specific date
async def get_tweets_before_date(target_date):
    cursor = db['tweets'].find({'date': {'$lt': target_date}})
    tweets = await cursor.to_list(length=None)
    return tweets

# Method to add random tweets data to the database
async def add_random_tweets_data(num_tweets):
    current_datetime = datetime.datetime.now()

    for _ in range(num_tweets):
        tweet = {
            'date': current_datetime - datetime.timedelta(days=random.randint(1, 4)),
            'text': 'Random tweet text goes here.'
        }
        await db['tweets'].insert_one(tweet)

# Usage examples:
# To retrieve tweets before a specific date:
# target_date = datetime.datetime(2023, 1, 1)
# tweets = await get_tweets_before_date(target_date)
# print(tweets)

# To add random tweets data to the database:
# num_tweets = 10
# await add_random_tweets_data(num_tweets)
