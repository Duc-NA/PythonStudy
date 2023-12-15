from flask_restx import Namespace, Resource, fields
from flask import request , jsonify, make_response
from ..models.users import User
from werkzeug.security import generate_password_hash,check_password_hash
from http import HTTPStatus
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity

auth_namespace=Namespace('auth', description="a namspace for authentication")

signup_model=auth_namespace.model(
    'User',{
        'UserName': fields.String(required=True,description="A username"),
        'Email': fields.String(required=True,description="An email"),
        'Password': fields.String(required=True,description="password of username")
    }
)

login_model=auth_namespace.model(
    'Login',{
        'UserName': fields.String(required=True,description="A username"),
        'Password': fields.String(required=True,description="password of username")
    }
)

@auth_namespace.route('/signup')
class SignUp(Resource):

    @auth_namespace.expect(signup_model)
    @auth_namespace.marshal_with(signup_model)
    def post(self):
        """
            create a new user account
        """
        data = request.get_json()
        new_user=User(
            UserName=data.get('UserName'),
            Email=data.get('Email'),
            Password=generate_password_hash(data.get('Password')),
        )
        new_user.save()
        return new_user, HTTPStatus.CREATED
        
@auth_namespace.route('/login')
class Login(Resource):

    @auth_namespace.expect(login_model)
    def post(self):
        """
            Generate jwt a pair
        """
        data = request.get_json()
        userName = data.get('UserName')
        password = data.get('Password')
        user = User.query.filter_by(UserName=userName).first()

        if (user is not None) and check_password_hash(user.Password,password):
            access_token = create_access_token(identity=user.UserName)
            refresh_token = create_refresh_token(identity=user.UserName)
            response = {
                'access_token' : access_token,
                'refresh_token':refresh_token
            }
        return response,HTTPStatus.OK
    

@auth_namespace.route('/refresh')
class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        """
            Generate jwt a pair
        """
        username = get_jwt_identity()
        access_token = create_access_token(identity=username)
        return {"access_token" : access_token},HTTPStatus.OK