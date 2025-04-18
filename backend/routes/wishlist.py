from flask import Blueprint, request, jsonify
wishlist_bp = Blueprint('wishlist', __name__)
wishlist_col = db["wishlist"]

@wishlist_bp.route('/wishlist', methods=['POST'])
def wishlist():
    data = request.json
    wishlist_col.insert_one(data)
    return jsonify({"message": "Wishlist submitted!"})
