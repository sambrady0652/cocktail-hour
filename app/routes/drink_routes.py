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
    if search_term == "":
        return {'results': []}

    drinks_list = Drink.query.filter(
        Drink.name.ilike(search_term + '%')).limit(5).all()
    return {'results': [drink.to_dict()
                        for drink in drinks_list]}


@drink_routes.route('/search/results', methods=['POST'])
def get_results():
    search_term = request.json.get('searchTerm')
    if search_term == "":
        return {'results': []}

    drinks_list = Drink.query.filter(
        Drink.name.ilike(search_term + '%')).all()
    return {'results': [drink.to_dict()
                        for drink in drinks_list]}
