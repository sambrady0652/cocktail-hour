# External Imports
import bcrypt
from datetime import datetime
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, jwt_optional
from flask import Blueprint, jsonify, request
import os
import re
from sqlalchemy import and_

# Local Imports
from app.models import db, User, Favorite, Drink

user_routes = Blueprint('users', __name__)


# SIGNUP
@user_routes.route('/signup', methods=['POST'])
def signup():
    # gather user submitted data
    email = request.form.get('email')
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    password = request.form.get('password')

    # validate there are no errors
    errors = validations_signup(email, first_name, last_name, password)
    # if there are errors, return them with a status of 401
    if len(errors) > 0:
        return {'errors': errors}, 401

    # hash password
    hashed_password = bcrypt.hashpw(
        password.encode('utf-8'), bcrypt.gensalt(14))

    # create user in database, save changes to database
    new_user = User(email=email, first_name=first_name,
                    last_name=last_name, encrypted_password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    # get id from newly created user by querying for their email
    user = User.query.filter(User.email == email).first()
    # convert user to dictionary (JSON)
    user_dict = user.to_dict()
    # create jwt for newly created user using their ID
    access_token = create_access_token(identity=user_dict['id'])
    # return newly created user's id and token with status of 200
    return {
        'access_token': access_token,
        'id': user_dict['id'],
    }, 200


# SIGN IN
@user_routes.route('/signin', methods=['POST'])
def signin():
    # gather user submitted data
    email = request.json.get('email')
    password = request.json.get('password')

    # validate there are no errors
    errors = validations_signin(email, password)
    # if there are errors, return them with a status of 401
    if len(errors) > 0:
        return {'errors': errors}, 401

    # find user by querying for their email create jwt, return user data
    user = User.query.filter_by(email=email).first()
    # convert the user to dictionary (JSON)
    user_dict = user.to_dict()
    # create token using the user's ID
    access_token = create_access_token(identity=user_dict['id'])
    # return found user's id and token with status of 200
    return {
        'access_token': access_token,
        'id': user_dict['id'],
    }, 200


# FAVORITES ROUTES
# Fetch User's Favorites
@user_routes.route('/<int:id>/favorites')
@jwt_optional
def get_favorites(id):
    favorites = [favorite.to_dict() for favorite in Favorite.query.filter(
        Favorite.user_id == id).all()]
    favIds = [fav['drink_id'] for fav in favorites]
    favorite_drinks = [drink.to_dict()
                       for drink in Drink.query.filter(Drink.id.in_(favIds))]
    return {'favorites': favorite_drinks}


# Favorite/Unfavorite Drinks
@user_routes.route('/<int:id>/favorites/<int:drink_id>', methods=['POST', 'DELETE'])
@jwt_optional
def fav_drink(id, drink_id):
    if request.method == 'POST':
        # Create, add, and return new favorite
        new_favorite = Favorite(user_id=id, drink_id=drink_id)
        db.session.add(new_favorite)
        db.session.commit()
        return {'new_favorite_id': new_favorite.to_dict()['drink_id']}

    if request.method == 'DELETE':
        # Find and remove targeted favorite
        favorite_to_delete = Favorite.query.filter(
            and_(Favorite.user_id == id, Favorite.drink_id == drink_id)).one()
        db.session.delete(favorite_to_delete)
        db.session.commit()
        return {}


# VALIDATION CHECKS
def validations_signup(email, first_name, last_name, password):
    regex = '[^@]+@[^@]+\.[^@]+'
    errors = []
    # Check Email is Unique
    email_found = User.query.filter(User.email == email).first()
    if(email_found):
        errors.append('Account already exists with this email address')
    # Check all information is provided
    if not email or not first_name or not last_name or not password:
        errors.append('Please ensure all fields are complete')
    # Check email is valid
    if email and not re.search(regex, email):
        errors.append('email is not valid')
    # Keep lengths in check
    if len(first_name) > 25:
        errors.append('first name is too long')
    if len(last_name) > 25:
        errors.append('last name is too long')
    if len(email) > 100:
        errors.append('please shorten your email')
    return errors


def validations_signin(email, password):
    errors = []
    # Check email and password are present
    if not email or not password:
        errors.append('Please provide an email and password')
        return errors
    # Attempt to find user with given email
    user = User.query.filter_by(email=email).first()
    if not user:
        errors.append('No user with that email was found')
        return errors

    # If user is found, check password
    if user:
        password_match = bcrypt.checkpw(
            password.encode('utf-8'), user.encrypted_password)
        if not password_match:
            errors.append('Password is incorrect')
    return errors
