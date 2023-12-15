from flask_restx import Namespace, Resource,fields
from ..models.userrole import UserRoleSchema, UserRole
from werkzeug.security import generate_password_hash
from http import HTTPStatus
from flask import jsonify, request, abort,make_response,json
from ..utils import db 

user_role_namespace=Namespace('usersroles', description="a namspace for userroles")

user_role_dto=user_role_namespace.model(
    'UserRole',{
        'Id': fields.Integer(description="user_role's id"),
        'RoleId': fields.Integer(description="role's id"),
        'UserId': fields.Integer(description="user's id"),
    }
)

@user_role_namespace.route('')
class UpdateUserRole(Resource):
    def post(self):
        """
            create an new user role
        """
        userRoles = request.get_json()
        listAdd = userRoles.get('listAdd'),
        listDelete = userRoles.get('listDelete'),
        for user_role in listAdd[0]:
            new_user_role=UserRole(
                UserId=user_role.get('UserId'),
                RoleId=user_role.get('RoleId'),
            )
            new_user_role.save()

        for user_role in listDelete[0]:
            delete_user_role=UserRole(
                UserId=user_role.get('UserId'),
                RoleId=user_role.get('RoleId'),
            )
            db.session.delete(delete_user_role)
            db.session.commit()
        return userRoles, HTTPStatus.CREATED
    
@user_role_namespace.route("/role/<roleId>")
class GetListUserByRoleId(Resource):
    def get(self,roleId):
        """
            get user by role id
        """
        user_roles = UserRole.query.filter_by(RoleId=roleId)
        if user_roles is not None:
            role_schema = UserRoleSchema(many=True)
            data = role_schema.dump(user_roles)
            return data,HTTPStatus.OK
        else:
            abort(404, f"user_role {roleId} not found")

@user_role_namespace.route("/user/<userId>")
class GetListUserByUserId(Resource):
    def get(self,userId):
        """
            get role by user id
        """
        user_roles = UserRole.query.filter_by(UserId=userId)
        if user_roles is not None:
            role_schema = UserRoleSchema(many=True)
            data = role_schema.dump(user_roles)
            return data,HTTPStatus.OK
        else:
            abort(404, f"user_role {userId} not found")
