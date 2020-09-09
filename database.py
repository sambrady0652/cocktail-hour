from app.models import User
from app import app, db
import bcrypt
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    default_user = User(
        first_name="Default",
        last_name="User",
        email="default@user.com",
        encrypted_password=bcrypt.hashpw(
            "password".encode('utf-8'), bcrypt.gensalt(14)),
        image_url="https://cocktail-hour-user-photos.s3.us-east-2.amazonaws.com/default_avatar.png")

    db.session.add(default_user)
    db.session.commit()
