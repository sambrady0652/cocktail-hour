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
        profile_pic_url="",
        location="Chicago, IL, USA")

    db.session.add(default_user)
    db.session.commit()
