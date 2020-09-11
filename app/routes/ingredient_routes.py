# External Imports
import boto3
from flask import Blueprint, jsonify, request
import os
import re
# This operator works with the SQLAlchemy ARRAY Data Type used in the Model
from sqlalchemy.sql.operators import ilike_op

# Local Imports
from app.models import db, User, Drink, Ingredient

ingredient_routes = Blueprint('ingredients', __name__)


# Returns All Ingredients
@ingredient_routes.route('/')
def get_options():
    ingredient_list = Ingredient.query.limit(5).all()
    return {'results': [ingredient.to_dict()
                        for ingredient in ingredient_list]}


# Search By Ingredient Type
@ingredient_routes.route('/search/results', methods=['POST'])
def get_results():
    # Dropdown menu on front-end provides ingredient Types. Retrieve it here
    ingredient_type = request.json.get('searchTerm')
    if ingredient_type == "":
        return {'results': []}
    # Find all ingredients of specified type, make a list of their Names
    ingredients_list = [ingredient.to_dict()['name'] for ingredient in Ingredient.query.filter(
        Ingredient.type.ilike(ingredient_type + "%")).all()]

    # For each ingredient in list created above, find drinks that include the ingredient
    drinks_list = []
    for ingredient in ingredients_list:
        drinks = Drink.query.filter(Drink.ingredients.any(
            ingredient, operator=ilike_op)).all()
        drinks_list.extend(drinks)

    # Return list of drinks
    return {'results': [drink.to_dict()
                        for drink in drinks_list]}
