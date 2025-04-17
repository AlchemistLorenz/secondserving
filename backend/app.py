from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.auth import auth_bp
from pymongo import MongoClient
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api')

#MongoDB Connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client["secondserving"]
users = db["users"]

if __name__ == "__main__":
    app.run(debug=True)
