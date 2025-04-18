from pymongo import MongoClient
from faker import Faker
from faker_food import FoodProvider
from dotenv import load_dotenv
import os
import random

load_dotenv()  # load environment variables from .env file

mongo_uri = os.getenv('MONGODB_URI')  # get MongoDB_URI from .env
db_name = os.getenv('DB_NAME')  # get db name from .env

# connect to MongoDB
client = MongoClient(mongo_uri)
db = client[db_name]  # access the specified database

# define collections
users_collection = db['users']
wishlists_collection = db['wishlists']
donations_collection = db['donations']

# clear existing collections to avoid duplicates
users_collection.drop()  # clear the users collection
wishlists_collection.drop()  # clear the wishlists collection
donations_collection.drop()  # clear the donations collection

# initialize Faker to generate fake database data (demo purposes)
fake = Faker()
fake.add_provider(FoodProvider)  # add food provider to Faker for generating random food-related data

# create a list to store registered user IDs
user_ids = []

# generate 15 random users with 'fake' data 
for _ in range(15):
    user = {
        'name': fake.name(),
        'email': fake.email(),
        'password': fake.password()
    }
    result = users_collection.insert_one(user) # insert user into the database, save result ID for doc inserted
    user_ids.append(result.inserted_id) # store the docID as user ID 

# generate wishlists for each user
for user_id in user_ids:
    wishlist = {
        'user_id': user_id,
        'ingredients': [fake.ingredient() for _ in range(random.randint(6, 12))]  # generate 6-12 random ingredients
    }
    wishlists_collection.insert_one(wishlist)  # insert wishlist into the database

# generate 1-3 donations for each user
for user_id in user_ids:
    donation = {
        'user_id': user_id,
        'amount': random.randint(1, 100),  # generate a random donation amount between 1 and 100
        'date': fake.date_time_this_year(),  # generate a random date that donation occured
        'to_charity': fake.company(),  # generate a random company name the donation was made to
    }
    donations_collection.insert_one(donation)  # insert donation into the database

