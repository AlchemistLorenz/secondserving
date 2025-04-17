from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from models.user import user_schema
import os

auth_bp = Blueprint('auth', __name__)

client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database("secondserving")
users = db.users

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if users.find_one({ "email": email }):
        return jsonify({ "message": "User already exists" }), 400

    hashed_pw = generate_password_hash(password)
    new_user = { "email": email, "password": hashed_pw }
    users.insert_one(new_user)

    return jsonify({ "message": "User registered successfully" })

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users.find_one({ "email": email })
    if not user or not check_password_hash(user["password"], password):
        return jsonify({ "message": "Invalid credentials" }), 401

    return jsonify({ "message": "Login successful", "email": email })
