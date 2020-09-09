from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    encrypted_password = db.Column(db.LargeBinary, nullable=False)
    image_url = db.Column(db.String)

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "image_url": self.image_url
        }


class Ingredient(db.Model):
    __tablename__ = "ingredients"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    type = db.Column(db.String(40))
    alcoholic = db.Column(db.String(40))


class Drink(db.Model):
    __tablename__ = "drinks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    alcoholic = db.Column(db.String(40), nullable=False)
    instructions = db.Column(db.Text(), nullable=False)
    image_url = db.Column(db.String())
    ingredients = db.Column(db.ARRAY(db.String()))
    measurements = db.Column(db.ARRAY(db.String()))
    measured_ingredients = db.Column(db.ARRAY(db.String(), as_tuple=True))
