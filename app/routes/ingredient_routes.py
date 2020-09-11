# External Imports
import boto3
from flask import Blueprint, jsonify, request
import os
import re
# This is an operator that works in conjunction with the postgres-dialect ARRAY Datatype
from sqlalchemy.sql.operators import ilike_op

# Local Imports
from app.models import db, User, Drink, Ingredient

ingredient_routes = Blueprint('ingredients', __name__)


# Returns All Ingredients
@ingredient_routes.route('/')
def get_options():
    ingredient_list = Ingredient.query.all()
    return {'results': [ingredient.to_dict()
                        for ingredient in ingredient_list]}


# Finds list of drinks that include the searched ingredient
@ingredient_routes.route('/search/results', methods=['POST'])
def get_results():
    # This is the term that is selected by the user. It is selected from a provided list of Ingredient Types
    ingredient_type = request.json.get('searchTerm')
    # if for some reason it is empty, return empty, so as to avoid 'undefined' error
    if ingredient_type == "":
        return {'results': []}
    # Create list of Ingredient Names for each ingredient with a type like that of the searched term
    ingredients_list = [ingredient.to_dict()['name']
                        for ingredient in Ingredient.query.filter(
        Ingredient.type.ilike(ingredient_type + '%')).all()]

    # Find all drinks that include an ingredient of the provided type
    drinks_list = []
    for ingredient in ingredients_list:
        drinks = Drink.query.filter(
            Drink.ingredients.any(ingredient, operator=ilike_op)).all()
        drinks_list.extend(drinks)

    # Return list of all drinks converted to Dictionary
    return {'results': [drink.to_dict()
                        for drink in drinks_list]}
