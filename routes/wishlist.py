from flask import Blueprint, request, jsonify
from pymongo import MongoClient
import os

wishlist_bp = Blueprint('wishlist', __name__)

client = MongoClient(os.getenv("MONGO_URI"))
db = client["secondserving"]
wishlist_col = db["wishlist"]

@wishlist_bp.route('/wishlist', methods=['POST'])
def submit_wishlist():
    data = request.get_json()
    wishlist_col.insert_one(data)
    return jsonify({"message": "Wishlist submitted!"}), 201
