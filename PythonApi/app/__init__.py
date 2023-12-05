from flask import Flask
from flask_restx import Api
from .orders.views import order_namespace
from .auth.views import auth_namespace
from .config.config import config_dict


# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt
# from .config import config_by_name

# db = SQLAlchemy()
# flask_bcrypt = Bcrypt()

def create_app(config=config_dict['dev']):
    app = Flask(__name__)
    # app.config.from_object(config_by_name[config_name])
    # db.init_app(app)
    # flask_bcrypt.init_app(app)

    app.config.from_object(config)
    api=Api(app)

    api.add_namespace(order_namespace)
    api.add_namespace(auth_namespace,path='/auth')

    return app