# External Imports
import boto3
from datetime import datetime
from flask import Blueprint, jsonify, request
import itertools
import os
import re

# Local Imports
from app.models import db, User, Drink

drink_routes = Blueprint('drinks', __name__)

# Initialize Boto3 to use AWS
s3 = boto3.resource('s3')
bucket = s3.Bucket(os.environ.get('AWS_BUCKET'))


@drink_routes.route('/search/suggestions', methods=['POST'])
def get_suggestions():
    search_term = request.json.get('searchTerm')
    # error check to ensure no 'undefined' results; plus if the input box is empty, we want no suggestions
    if search_term == "":
        return {'results': []}
    # find all drinks that match the search term. Limit to 5 here because these appear
    # as drop-down suggestions in the search input form. Called onChange
    drinks_list = Drink.query.filter(
        Drink.name.ilike(search_term + '%')).limit(5).all()
    return {'results': [drink.to_dict()
                        for drink in drinks_list]}


@drink_routes.route('/search/results', methods=['POST'])
def get_results():
    search_term = request.json.get('searchTerm')
    # error check to ensure no 'undefined' results
    if search_term == "":
        return {'results': []}
    # Returns list of all drinks that are like the searched Term. uses % wildcard to
    # return any drinks that start with the searched term
    drinks_list = Drink.query.filter(
        Drink.name.ilike(search_term + '%')).all()
    return {'results': [drink.to_dict()
                        for drink in drinks_list]}


@drink_routes.route('/create', methods=['POST'])
def create_drink():
    # gather user submitted data
    name = request.form.get('name')
    ingredients = request.form.get('ingredients').split(',')
    measurements = request.form.get('measurements').split(',')
    instructions = request.form.get('instructions')
    alcoholic = request.form.get('alcoholic')
    if alcoholic == "true":
        alcoholic = "Alcoholic"
    if alcoholic == "false":
        alcoholic = "Non alcoholic"
    image_url = "https://cocktail-hour-site-images.s3.amazonaws.com/13598470Untitled-3-512.png"
    if len(request.files) > 0:
        img = request.files['image_url']
        key = f'{datetime.now()}{img.filename}'
        bucket.put_object(Key=key, Body=img, ContentType=img.content_type)
        image_url = f'https://cocktail-hour-user-photos.s3.us-east-2.amazonaws.com/{key}'

    measured_ingredients = list(zip(ingredients, measurements))
    # validations
    errors = validate_create_drink(
        name, ingredients, measurements, instructions, alcoholic, image_url)
    if len(errors) > 0:
        return {'errors': errors}, 401

    new_drink = Drink(
        name=name,
        ingredients=ingredients,
        measurements=measurements,
        instructions=instructions,
        alcoholic=alcoholic,
        image_url=image_url,
        measured_ingredients=measured_ingredients)

    db.session.add(new_drink)
    db.session.commit()

    return new_drink.to_dict()


# VALIDATIONS
def validate_create_drink(name, ingredients, measurements, instructions, alcoholic, image_url):
    return []
