# External Imports
import boto3
from flask import Blueprint, jsonify, request
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
