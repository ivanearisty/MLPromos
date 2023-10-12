from motor.motor_asyncio import AsyncIOMotorClient

from modules.parameters import parameters

DATABASE_URL = f"mongodb://{parameters.mongodb_user}:{parameters.mongodb_password}@{parameters.mongodb_host}:{parameters.mongodb_port}/{parameters.mongodb_database}"

db = AsyncIOMotorClient(DATABASE_URL)[parameters.mongodb_database]

#mongodb://admin:e4yX8152tnKg@localhost:27017