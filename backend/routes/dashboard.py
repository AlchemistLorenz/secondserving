from flask import Blueprint, request, jsonify
dashboard_bp = Blueprint('dashboard', __name__)
claims_col = db["claims"]

@dashboard_bp.route('/my-donations')
def my_donations():
    email = request.args.get("email")
    my_items = list(donations_col.find({"donorEmail": email}))
    for item in my_items:
        item["_id"] = str(item["_id"])

    return jsonify(my_items)

@dashboard_bp.route('/my-claims')
def my_claims():
    email = request.args.get("email")
    my_claims = list(claims_col.find ({"claimerEmail": email}))
    for item in my_claims:
        item["_id"] = str(item["_id"])
    return jsonify(my_claims)