from flask_restx import Namespace, Resource,fields
from ..models.users import User, UserSchema
from werkzeug.security import generate_password_hash
from http import HTTPStatus
from flask import jsonify, request, abort,make_response,json
from ..utils import db 

user_namespace=Namespace('users', description="a namspace for user")

user_dto=user_namespace.model(
    'User',{
        'Id': fields.Integer(description="user's id"),
        'UserName': fields.String(required=True,description="A username"),
        'Email': fields.String(required=True,description="An email"),
        'Password': fields.String(required=True,description="password of username")
    }
)

@user_namespace.route('/users')
class GetUpdateDelete(Resource):
    def get(self):
        """
            Retrieve list user
        """
        users = User.query.all()
        user_schema = UserSchema(many=True)
        data = user_schema.dump(users)
        return data
        
    @user_namespace.expect(user_dto)
    @user_namespace.marshal_with(user_dto)
    def put(self):
        """
            Update an user with id
        """
        data = request.get_json()
        user = User.query.filter_by(Id=data['Id']).first()
        if user is not None:
            user.UserName = data['UserName']
            user.Email = data['Email']
            user.Password = generate_password_hash(data['Password'])
            db.session.commit()
            return data, HTTPStatus.OK
        else:
            abort(404, f"User {data.UserName} not found")

    @user_namespace.expect(user_dto)
    @user_namespace.marshal_with(user_dto)
    def post(self):
        """
            create an new user with id
        """
        data = request.get_json()
        new_user=User(
            UserName=data.get('UserName'),
            Email=data.get('Email'),
            Password=generate_password_hash(data.get('Password')),
        )
        new_user.save()
        return new_user, HTTPStatus.CREATED

@user_namespace.route("/users/<userId>")
class GetListUser(Resource):
    def get(self,userId):
        """
            get user by id
        """
        users = User.query.get(userId)
        
        if users is not None:
            user_schema = UserSchema(many=False)
            data = user_schema.dump(users)
            return data,HTTPStatus.OK
        else:
            abort(404, f"User {userId} not found")
    
    def delete(self,userId):
        """
            Delete an user with id
        """
        user = User.query.filter_by(Id=userId).first()
        if user is not None:
            db.session.delete(user)
            db.session.commit()
            return userId, HTTPStatus.OK
        else:
            abort(404, f"User {userId} not found")
