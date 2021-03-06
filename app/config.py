import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_ECHO = True
    JWT_ACCESS_TOKEN_EXPIRES = int(604800)
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
