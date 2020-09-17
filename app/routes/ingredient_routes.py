# External Imports
from flask import Blueprint, jsonify, request
import os
import re
# This operator works with the SQLAlchemy ARRAY Data Type used in the Model
from sqlalchemy.sql.operators import ilike_op
from sqlalchemy.sql.expression import func

# Local Imports
from app.models import db, User, Drink, Ingredient

ingredient_routes = Blueprint('ingredients', __name__)


# Returns All Ingredients
@ingredient_routes.route('/')
def get_options():
    ingredient_list = Ingredient.query.limit(5).all()
    return {'results': [ingredient.to_dict()
                        for ingredient in ingredient_list]}


# Retrieve list of Ingredient Suggestions for Create Drink Form
@ingredient_routes.route('/suggestions', methods=['POST'])
def get_suggestions():
    search_term = request.json.get('searchTerm')
    # error check to ensure no 'undefined' results; plus if the input box is empty, we want no suggestions
    if search_term == "":
        return {'ingredients': []}
    # find all ingredients that match the search term. Limit to 5 here because these appear
    # as drop-down suggestions in the search input form. Called onChange
    ingredients_list = Ingredient.query.filter(
        Ingredient.name.ilike('%' + search_term + '%')).limit(5).all()
    return {'ingredients': [ingredient.to_dict()
                            for ingredient in ingredients_list]}


# Retrieve List of Ingredient Types to offer as Options in dropdown menu
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


# Retrieve list of Ingredients, given a selected Type
@ingredient_routes.route('/type/search', methods=['POST'])
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
@ingredient_routes.route('/type/search/drinks', methods=['POST'])
def get_results():
    # Dropdown menu on front-end provides ingredients. Retrieve list of them here
    ingredient_list = request.json.get('searchTerm')
    if ingredient_list == []:
        return {'results': []}

    # find drinks that include the ingredient(s) by iterating over list for every searched ingredient
    drinks_list = []
    for ingredient in ingredient_list:
        drinks = Drink.query.filter(Drink.ingredients.any(
            ingredient, operator=ilike_op)).order_by(func.random()).all()
        drinks_list.extend(drinks)

    # ensure only one iteration of drink appears
    filtered_drinks = []
    for d in drinks_list:
        if d not in filtered_drinks:
            filtered_drinks.append(d)

    # Return list of drinks
    return {'results': [drink.to_dict()
                        for drink in filtered_drinks]}
