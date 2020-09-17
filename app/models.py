from flask_sqlalchemy import SQLAlchemy
# Note: the default ARRAY datatype offered by db does not support most comparison operations
# so I am using the postgresql dialect-specific array datatype, which works with psycopg2.
# see ingredients_routes.py for implementation.
from sqlalchemy.dialects import postgresql

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    encrypted_password = db.Column(db.LargeBinary, nullable=False)
    favorites = db.relationship("Favorite", back_populates="user")

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
        }


class Ingredient(db.Model):
    __tablename__ = "ingredients"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    type = db.Column(db.String(40))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type
        }


class Drink(db.Model):
    __tablename__ = "drinks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    alcoholic = db.Column(db.String(40), nullable=False)
    instructions = db.Column(db.Text(), nullable=False)
    image_url = db.Column(db.String())
    ingredients = db.Column(postgresql.ARRAY(db.String()))
    measurements = db.Column(postgresql.ARRAY(db.String()))
    measured_ingredients = db.Column(
        postgresql.ARRAY(db.String(), as_tuple=True))
    favorites = db.relationship("Favorite", back_populates="drink")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "alcoholic": self.alcoholic,
            "instructions": self.instructions,
            "image_url": self.image_url,
            "ingredients": self.ingredients,
            "measurements": self.measurements,
            "measured_ingredients": self.measured_ingredients,
        }


class Favorite(db.Model):
    __tablename__ = "favorites"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    drink_id = db.Column(db.Integer, db.ForeignKey(
        "drinks.id"), nullable=False)

    user = db.relationship("User", back_populates="favorites")
    drink = db.relationship("Drink", back_populates="favorites")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "drink_id": self.drink_id,
        }
