import os
from decouple import config
from datetime import timedelta

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY=config('SECRET_KEY','secret')
    # SQLALCHEMY_TRACK_MODIFICATIONS=False
    JWT_ACCESS_TOKEN_EXPIRES=timedelta(minutes=30)
    JWT_AREFRESH_TOKEN_EXPIRES=timedelta(minutes=30)
    JWT_SECRET_KEY=config('JWT_SECRET_KEY')
    PROPAGATE_EXCEPTIONS=True
class DevConfig(Config):
    DEBUG=config('DEBUG',cast=bool)
    # SQLALCHEMY_ECHO=True
    # SQLALCHEMY_DATABASE_URI = 'mysql://root:admin123@localhost/baseproject'
class TestConfig(Config):
    pass

class ProdConfig(Config):
    pass

config_dict={
    'dev': DevConfig,
    'prod':ProdConfig,
    'test':TestConfig,
}