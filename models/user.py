def user_schema(user):
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "password": user["password"]
    }