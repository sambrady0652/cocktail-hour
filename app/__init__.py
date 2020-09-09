# External Modular Imports
import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_jwt_extended import JWTManager

# Local Imports
from app.models import db, User
from app.api.user_routes import user_routes
from app.config import Config

# Creates a Flask App named 'app'
app = Flask(__name__, static_url_path='')
# Retrieve Config Vars form Config Object
app.config.from_object(Config)
# Register API Route Blueprints
app.register_blueprint(user_routes, url_prefix='/api/users')
# Connects Flask App to Database Models
db.init_app(app)
# Uses Flask Migrate to establish ORM
Migrate(app, db, compare_type=True)
# Initializes JSON Web Tokens to be used with Flask App
jwt = JWTManager(app)
# Initializes CORS tobe used with Flask_App
CORS(app)


# Adds CORS Token as a Cookie to each request made to server to maintain security
@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get('FLASK_ENV') else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') else None,
                        httponly=True)
    return response


# Serves up static files to index.html if the route begins with anything other than /api
@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def react_root(path):
    return app.send_static_file('index.html')
