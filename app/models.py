from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy.dialects.postgresql import ARRAY

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    encrypted_password = db.Column(db.LargeBinary, nullable=False)
    image_url = db.Column(db.String)
    favorites = db.relationship("Favorite", back_populates="user")

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "image_url": self.image_url,
            "favorites": self.favorites
        }


class Ingredient(db.Model):
    __tablename__ = "ingredients"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    type = db.Column(db.String(40))
    alcoholic = db.Column(db.String(40))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "alcoholic": self.alcoholic,
        }


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
            "favorites": self.favorites
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
            "user": self.user,
            "drink": self.drink,
        }
