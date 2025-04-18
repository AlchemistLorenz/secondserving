from flask import Blueprint, request, jsonify
from pymongo import MongoClient
import os

auth_bp = Blueprint('auth', __name__)

client = MongoClient(os.getenv("MONGO_URI"))
db = client["secondserving"]
users_col = db["users"]

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400

    if users_col.find_one({"email": email}):
        return jsonify({"error": "User already exists."}), 409

    users_col.insert_one({"email": email, "password": password})
    return jsonify({"message": "Registered!"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = users_col.find_one({"email": email, "password": password})
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({"message": "Logged in!"}), 200
