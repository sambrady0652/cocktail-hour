# External Imports
import boto3
from flask import Blueprint, jsonify, request
import os
import re

# Local Imports
from app.models import db, User, Drink, Ingredient

ingredient_routes = Blueprint('ingredients', __name__)


# Returns All Ingredients
@ingredient_routes.route('/')
def get_options():
    ingredient_list = Ingredient.query.limit(5).all()
    return {'results': [ingredient.to_dict()
                        for ingredient in ingredient_list]}


# Finds list of drinks that include the searched ingredient
# UNDER CONSTRUCTION
@ingredient_routes.route('/search/results', methods=['POST'])
def get_results():
    search_term = request.json.get('searchTerm')
    if search_term == "":
        return {'results': []}

    drinks_list = Drink.query.filter(
        Drink.ingredients.contains(search_term + '%')).all()
    return {'results': [drink.to_dict()
                        for drink in drinks_list]}
