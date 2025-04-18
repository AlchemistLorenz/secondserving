from flask import Blueprint, request, jsonify 

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    #Inserts user to Mongo 
    return jsonify({"message": "User registered!"}), 201

@auth_bp.route('/login', methods='POST')
def login():
    data = request.json
    #Checks user from mongo
    return jsonify({"message": "Logged in!"}), 200