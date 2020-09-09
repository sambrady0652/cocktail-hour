# External Imports
import bcrypt
import boto3
from datetime import datetime
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask import Blueprint, jsonify, request
from flask import Blueprint, jsonify
import os
import re

# Local Imports
from app.models import db, User
from app.models import User

user_routes = Blueprint('users', __name__)

# Initialize Boto3 to use AWS
s3 = boto3.resource('s3')
bucket = s3.Bucket(os.environ.get('AWS_BUCKET'))


# SIGNUP
@user_routes.route('/signup', methods=['POST'])
def signup():
    # gather user submitted data
    email = request.form.get('email')
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    password = request.form.get('password')
    # set default profile picture unless a new one is supplied
    image_url = "https://cocktail-hour-user-photos.s3.us-east-2.amazonaws.com/default_avatar.png"
    if len(request.files) > 0:
        img = request.files['imageUrl']
        key = f'{datetime.now()}{img.filename}'
        # if a new one is supplied, upload it to AWS Bucket and reassign value to new image
        bucket.put_object(Key=key, Body=img, ContentType=img.content_type)
        image_url = f'https://cocktail-hour-user-photos.s3.us-east-2.amazonaws.com/{key}'

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
                    last_name=last_name, encrypted_password=hashed_password, image_url=image_url)
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


# Fetches/Updates User Details
@user_routes.route('/<int:id>', methods=['GET', 'PATCH'])
@jwt_required
def user_page(id):
    if request.method == 'GET':
        found_user = User.query.filter(User.id == id).first()
        if found_user:
            return found_user.to_dict()
        else:
            return {'error': "User not found"}, 400
    else:
        # gather user submitted data
        json = request.get_json()
        first_name = json.get('first_name')
        last_name = json.get('last_name')
        location = json.get('location')

        # validate user submitted data
        errors = validations_user_details(last_name, first_name)
        if len(errors) > 0:
            return {'errors': errors}

        # get id from json web token
        current_user_id = get_jwt_identity()

        # if user is found in database then update user details. If not, send error to client
        found_user = User.query.filter(User.id == current_user_id).first()
        if(found_user):
            found_user.first_name = first_name
            found_user.last_name = last_name
            found_user.location = location
            db.session.commit()
            return {'message': 'Success'}, 200
        else:
            return {'error': 'User was not found'}, 400


# Deletes Account
@user_routes.route('/delete_account', methods=['DELETE'])
@jwt_required
def delete_account():
    # get id from json web token
    current_user_id = get_jwt_identity()

    # retrieve user from data to be deleted if exists
    temp_user = User.query.filter(User.id == current_user_id).first()
    if temp_user is None:
        return {'error': 'User with given id does not exist'}, 400

    # delete user from database
    db.session.delete(temp_user)
    db.session.commit()
    return {'status': 200}


# VALIDATION CHECKS
def validations_signup(email, first_name, last_name, password):
    regex = '[^@]+@[^@]+\.[^@]+'
    errors = []
    # Check Email is Unique
    email_found = User.query.filter(User.email == email).first()
    if(email_found):
        errors.append('Account already exists with this email address')
    if not email or not first_name or not last_name or not password:
        errors.append('Please ensure all fields are complete')
    if email and not re.search(regex, email):
        errors.append('email is not valid')
    if len(first_name) > 25:
        errors.append('first name is too long')
    if len(last_name) > 25:
        errors.append('last name is too long')
    if len(email) > 100:
        errors.append('please shorten your email')
    return errors


def validations_signin(email, password):
    errors = []
    if not email or not password:
        errors.append('Please provide an email and password')
        return errors
    user = User.query.filter_by(email=email).first()
    if not user:
        errors.append('No user with that email was found')
        return errors
    if user:
        password_match = bcrypt.checkpw(
            password.encode('utf-8'), user.encrypted_password)
        if not password_match:
            errors.append('Password is incorrect')
        if len(email) > 100:
            errors.append('please shorten your email')
    return errors


def validations_user_details(last_name, first_name):
    errors = []
    if not last_name:
        errors.append('first name is missing')
    if not first_name:
        errors.append('last name is missing')
    if len(errors) > 0:
        return errors
    if len(last_name) > 40:
        errors.append('last name length is too long')
    if len(first_name) > 40:
        errors.append('first name length is too long')
    if len(last_name) < 1:
        errors.append('last name was not provided')
    if len(first_name) < 1:
        errors.append('first name was not provided')
    return errors
