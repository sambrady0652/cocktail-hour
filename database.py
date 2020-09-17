from collections import namedtuple
import itertools
import json
from app.models import User, Ingredient, Drink
from app import app, db
from unused import unused
import bcrypt
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()
    with open('./dataFetching/ingredients.js') as f:
        data = json.load(f)
        for ingredient in data:
            if ingredient['name'] not in unused:
                new_ingredient = Ingredient(
                    name=ingredient['name'],
                    type=ingredient['type'])
                db.session.add(new_ingredient)
                db.session.commit()

    with open('./dataFetching/drinks.js') as f:
        data = json.load(f)
        for drink in data:
            new_drink = Drink(
                name=drink['name'],
                alcoholic=drink['alcoholic'],
                instructions=drink['instructions'],
                image_url=drink['image_url'],
                ingredients=drink['ingredients'],
                measurements=drink['measurements'],
                measured_ingredients=(itertools.zip_longest(drink['ingredients'], drink['measurements'])))
            db.session.add(new_drink)
            db.session.commit()

    default_user = User(
        first_name="Default",
        last_name="User",
        email="default@user.com",
        encrypted_password=bcrypt.hashpw("password".encode('utf-8'), bcrypt.gensalt(14)))

    db.session.add(default_user)
    db.session.commit()
