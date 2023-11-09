## How-to guide

Go to Hackathon Submission for Hackathon Submission. This branch has been updated post the submission deadline and might not be fully functional.

1. Download Docker Desktop
2. Download the entire source code for the project
3. From the root project directory, run:
```
docker-compose rm -f ##!!!NOTE THIS REMOVES ALL OF YOUR DOCKER CONTAINERS!!! ._.
docker-compose pull
docker-compose up --build -d
```
4. Go to local http://localhost:8000/test to check that the backend is working
5. Wait a bit and then go to http://localhost:4200/ 
6. Press Fetch 

NOTE: The backend does not actively extract tweets from twitter yet, so to test extraction of tweets you can add one to the database manually with express, or use the addTest endpoint at 8000 to add one. 

## Inspiration

When studying in NYC, I was in an apartment with 4 people and 4 more upstairs. Some of the best nights with my roommates were when someone would find a promo code for Postmates or Uber Eats, and we would then proceed to drop everything and order an 8-stacked promo code feast. We would have the rare chance to dine like kings in such an expensive city.

I always thought that there must be a way to automate this. I once heard that if a human can tell if something is "yes" or "no" in less than 1 second, then an ML model can be implemented to do it. So, what if an app could just push a notification to you whenever it found a promo code? ML Promos aims to be that.

## What it does

ML Promos is in its very early stages, but it successfully implements an NLP Named Entity Extraction model to evaluate if a promo code is present in a string, and then pushes that code to an Angular web app.

## How I built it

ML Promos has 4 main parts in Docker containers.

- **MongoDB:** A MongoDB that stores tweet info contains
- **The Backend:**
    1. A fast API app with a websocket endpoint that, when connected to, applies the machine learning model to all tweets in the database and sends all promo codes recognized as valid with their relevant created at date.

    2. A directory called mlmodel that contains the steps used to create the machine learning model using Spacy. `model-best` was then pasted into src/modules for use by the main app. Note, dockerignore ignores this as it contains secret.py at the moment.

    3. Currently, development-only methods like `add_random_tweets_data` and `insert_new_tweet` were used to test the database. These serve as a proof of concept that tweets can be readily added to the database.

- **The Frontend:** The frontend is a very simple Angular app that contains:
    - a component for a single tweet
    - a tweetlist component that displays a list of tweets and populates the tweet interface
    - a socket-service to connect to the backend on button click and receive
- **Mongo Express:**
    - a simple visualizer of the database.

I also used:
- An open-source annotation tool for NER models that allowed me to manually tag 223 tweets and generate annotations.json (in the mlmodel directory) to use as training data.
- twscrape to scrape tweets for use as training data in scraperNB, and to be used in the future to actively scrape tweets.

## Challenges I Ran Into and Accomplishments That I'm Proud Of

### Not knowing how to use a single piece of tech

This was a real blind project for me. I had never before used any of the technology (except for Python) as I have focused most of my work on Java.

I had to quickly learn how to use Docker, Angular, the Nx console, MongoDB, Scraping, FastAPI, TypeScript, HTML, CSS, and Spacy.

Plus, I had to learn all the concepts related to these technologies. I did not understand what containers were or what an image was. I had no idea what a component was or how web apps are rendered. I had never used a NoSQL database before... you get my point.

**Therefore,** I understand my app is not complete, but it and this Hackathon have given me so much exposure to new technologies that I cannot let impostor syndrome prevent me from submitting.

### Setting up MongoDB

Setting up a database I had never used before was hard to understand. I had to research how MongoDB works and all of the components that go into creating such a database.

A lot of users had experienced problems when using Docker and mongo-init.js, plus this was the first time I was using Docker since I chose to set up my database first.

Thankfully, I was able to containerize the database through reading multiple forums from the community.

### Getting everything to talk to each other

The first time my websocket connected, I almost fell off my chair.

Deploying individual components of my application was hard enough, getting them to talk to each other was a nightmare for me. However, I was able to learn a lot about how HTTP works through this process of trial and error.

By the time I dockerized the backend and frontend (non-database) folders, I felt like I understood much better what I had to do to get them to communicate. The docker-compose file didn't seem as intimidating as when I set up the database, and my first exposure to a Dockerfile had me thinking, "ah yes, of course, we have to do this."

When the "why" of doing something clicks in your head, it's a big milestone.

### Creating a Model

I had no idea where to start when creating the ML model. I tried using GCP AutoML, but I was not able to figure out the formatting. I even asked a [Stack Overflow question](https://stackoverflow.com/questions/77434606/validate-json-lines-from-public-yaml-schema-preparing-data-for-automl-entity-e).

After a lot of pain, I ended up looking for an alternative solution with Spacy and was able to get the model to work.

It was not up to the standards of production-ready models, but it was a great start for the limited data I had. See the next section.

### Twitter data and a legality scare

Twitter imposes very strict limits on access to its data now, so it was very hard to get tweets. I was only able to obtain relevant tweets from the past couple of days, so the data was very skewed. A proper model will need much more data from diverse points in time. Promo Codes are very predictable, but I need to generate an ML model that has as much variability as possible in the future.

Finally, after that, a friend pointed out I should look into the legality because Docker would never accept an illegal submission. This shoved me into panic mode, but thankfully I figured out that the data I was scraping is currently qualified as "[public information](https://cdn.ca9.uscourts.gov/datastore/opinions/2022/04/18/17-16783.pdf)" so I was in the clear. But if [current lawsuits](https://regmedia.co.uk/2023/07/14/twitter-doe-scraping-suit.pdf) that Twitter is doing now end up destroying the legality of the project, this will not be viable unless it uses the Twitter API.

## What I Learned

I learned so much about multiple technologies. Like... I learned basic TypeScript! That's a whole new language! Now that I feel much more comfortable with all the tools I used, I am ready to keep making this app better and better.

Although, what I learned the most was that I knew nothing. Every time I started learning about a technology, I was able to visualize new gaps in understanding, ready for me to fill them. I think this is good. Exploring reveals more areas to explore, and I can't wait to keep moving forward with ML Promos.

## What's Next for ML Promos

First of all, I need to train the model more and with more diverse data.

Second of all, I want to make the project completely functional locally. That would mean that:
- The backend will either periodically or when connected, update the MongoDB tweets database by removing tweets older than a certain amount and adding new tweets in between the last time it scraped and now.
- The backend will not duplicate tweets with the same text; instead, it will aggregate them and display dates on which it found the code.
- The frontend has a way of telling the backend that a promo code didn't work so it can remove it.

Third of all, I want to refactor, clean, and align with best practices.

- Having your MongoDB passwords right there like `MONGO_INITDB_ROOT_PASSWORD: e4yX8152tnKg` is unacceptable.
- Having to copy-paste the best model should be an automatic process.
- The backend has to adhere to single responsibility and the general SOLID design principles.

Finally, if all goes well, I want to deploy this remotely so it can be accessed by friends and family who also want cheap food!