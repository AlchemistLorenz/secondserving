from flask import Blueprint, request, jsonify
from pymongo import MongoClient
import os

dashboard_bp = Blueprint('dashboard', __name__)

client = MongoClient(os.getenv("MONGO_URI"))
db = client["secondserving"]
donations_col = db["donations"]
claims_col = db["claims"]

@dashboard_bp.route('/my-donations', methods=['GET'])
def my_donations():
    email = request.args.get("email")
    donations = list(donations_col.find({"donorEmail": email}))
    for d in donations:
        d["_id"] = str(d["_id"])
    return jsonify(donations)

@dashboard_bp.route('/my-claims', methods=['GET'])
def my_claims():
    email = request.args.get("email")
    claims = list(claims_col.find({"claimerEmail": email}))
    for c in claims:
        c["_id"] = str(c["_id"])
    return jsonify(claims)
