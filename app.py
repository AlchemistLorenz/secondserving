from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.donations import donations_bp
from routes.chat import chat_bp
from routes.wishlist import wishlist_bp
from routes.dashboard import dashboard_bp
from dotenv import load_dotenv
from pymongo import MongoClient
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")
CORS(app, resources={r"/api/*": {"origins": "https://secondservingfrontend.onrender.com"}})

# Register all Blueprints
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(donations_bp, url_prefix='/api')
app.register_blueprint(chat_bp, url_prefix='/api')
app.register_blueprint(wishlist_bp, url_prefix='/api')
app.register_blueprint(dashboard_bp, url_prefix='/api')

# MongoDB Connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client["secondserving"]
users = db["users"]

@app.route("/")
def index():
    return{"status": "Backend is running"}
if __name__ == "__main__":
    app.run(debug=True)

@app.route("/test", methods=["GET", "POST"])
def test():
    return {"message": "This works"}, 200

