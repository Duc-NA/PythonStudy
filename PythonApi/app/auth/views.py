from flask_restx import Namespace, Resource, fields
from flask import request 
from ..models.users import User
from werkzeug.security import generate_password_hash,check_password_hash
from http import HTTPStatus

auth_namespace=Namespace('auth', description="a namspace for authentication")

signup_model=auth_namespace.model(
    'User',{
        'UserName': fields.String(required=True,description="A username"),
        'Email': fields.String(required=True,description="An email"),
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

    def post(self):
        """
            Generate jwt a pair
        """
        pass