from flask import Blueprint, request, jsonify

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/chat', methods=['POST'])
def chat():
    message = request.get_json().get("message", "")
    # Mock AI response – replace with actual AI logic later
    return jsonify({"reply": f"You said: {message}"})
