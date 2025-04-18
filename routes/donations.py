from flask import Blueprint, request, jsonify
from pymongo import MongoClient
import os

donations_bp = Blueprint('donations', __name__)

client = MongoClient(os.getenv("MONGO_URI"))
db = client["secondserving"]
donations_col = db["donations"]

@donations_bp.route('/donations', methods=['POST'])
def donate():
    data = request.get_json()
    donations_col.insert_one(data)
    return jsonify({"message": "Donation received!"}), 201

@donations_bp.route('/donations', methods=['GET'])
def get_donations():
    donations = list(donations_col.find())
    for d in donations:
        d["_id"] = str(d["_id"])
    return jsonify(donations)
