from flask import Flask
from flask_restx import Api
from .orders.views import order_namespace
from .auth.views import auth_namespace
from .users.views import user_namespace
from .roles.views import role_namespace
from .userroles.views import user_role_namespace
from .config.config import config_dict
from flask_jwt_extended import JWTManager

# from .models.users import User
from .utils import db,ma

def create_app(config=config_dict['dev']):
    app = Flask(__name__)
    app.config.from_object(config)
    

    # MySQL configurations
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:admin123@localhost/baseproject'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    ma.init_app(app)
    #JWT config 
    jwt = JWTManager(app)
    #api config
    api=Api(app)
    api.add_namespace(order_namespace,path='/api/order')
    api.add_namespace(auth_namespace,path='/api/auth')
    api.add_namespace(user_namespace,path='/api/user')
    api.add_namespace(role_namespace,path='/api/role')
    api.add_namespace(user_role_namespace,path='/api/user_role')
    return app