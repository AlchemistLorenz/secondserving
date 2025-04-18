from flask import Blueprint, request, jsonify
chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/chat', methods=['POST'])
def chat():
    msg = request.json.get('message')
    return jsonify({"reply": f"You said: {msg}"})
