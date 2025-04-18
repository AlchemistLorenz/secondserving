from flask import Blueprint, request, jsonify
from pymongo import MongoClient
import os

donations_bp = Blueprint('donations', __name__)

client = MongoClient(os.getenv("MONGO_URI"))
db = client["secondserving"]
donations_col = db["donations"]

@donations_bp.route('/donations', methods=['GET'])
def get_donations():
    data = list(donations_col.find())
    for d in data:
        d["_id"] = str(d["_id"])
    return jsonify(data)
