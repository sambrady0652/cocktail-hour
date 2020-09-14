# External Imports
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


# Retrieve List of Ingredient Types
@ingredient_routes.route('/type')
def get_types():
    # Retrieve list of all ingredient types
    type_list = [ingredient.to_dict()['type']
                 for ingredient in Ingredient.query.order_by(Ingredient.type).all()]

    # Filter the list to only include one iteration of each type
    filtered_types = []
    for t in type_list:
        if t not in filtered_types:
            filtered_types.append(t)

    # Return list of Types
    return {'types': filtered_types}


# Retrieve list of Ingredients, given a selected type
@ingredient_routes.route('/type/list', methods=['POST'])
def get_ingredients():
    # Dropdown menu on front-end provides Ingredient Type. Retrieve it here
    ingredient_type = request.json.get('searchTerm')
    if ingredient_type == "":
        return {'ingredients': []}

    # Find all ingredients of specified type, make a list of their names
    ingredients_list = [ingredient.to_dict()['name'] for ingredient in Ingredient.query.filter(
        Ingredient.type.ilike(ingredient_type + "%")).all()]

    # Return list of ingredients
    return {'ingredients': ingredients_list}


# Retrieve list of drinks, given selected ingredient
@ingredient_routes.route('/type/search/results', methods=['POST'])
def get_results():
    # Dropdown menu on front-end provides ingredient. Retrieve it here
    ingredient = request.json.get('searchTerm')
    if ingredient == "":
        return {'results': []}

    # find drinks that include the ingredient
    drinks_list = Drink.query.filter(Drink.ingredients.any(
        ingredient, operator=ilike_op)).all()

    # Return list of drinks
    print("THESE ARE RESULTS", drinks_list)
    return {'results': [drink.to_dict()
                        for drink in drinks_list]}
