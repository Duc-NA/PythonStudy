from flask_restx import Namespace, Resource,fields
from ..models.roles import RoleSchema, Role
from werkzeug.security import generate_password_hash
from http import HTTPStatus
from flask import jsonify, request, abort,make_response,json
from ..utils import db 

user_role_namespace=Namespace('users roles', description="a namspace for user roles")

role_dto=user_role_namespace.model(
    'role',{
        'Id': fields.Integer(description="role's id"),
        'RoleName': fields.String(required=True,description="A RoleName"),
        'RoleCode': fields.String(required=True,description="An RoleCode"),
        'Description': fields.String(required=True,description="Description of rolename")
    }
)

@user_role_namespace.route('/roles')
class GetUpdateDelete(Resource):
    def get(self):
        """
            Retrieve list roles
        """
        roles = Role.query.all()
        role_schema = RoleSchema(many=True)
        data = role_schema.dump(roles)
        return data
        
    @user_role_namespace.expect(role_dto)
    @user_role_namespace.marshal_with(role_dto)
    def put(self):
        """
            Update an role with id
        """
        data = request.get_json()
        role = Role.query.filter_by(Id=data['Id']).first()
        if role is not None:
            role.RoleName = data['RoleName']
            role.RoleCode = data['RoleCode']
            role.Description = data['Description']
            db.session.commit()
            return data, HTTPStatus.OK
        else:
            abort(404, f"role {data.RoleName} not found")

    @user_role_namespace.expect(role_dto)
    @user_role_namespace.marshal_with(role_dto)
    def post(self):
        """
            create an new role with id
        """
        data = request.get_json()
        new_role=Role(
            RoleName=data.get('RoleName'),
            RoleCode=data.get('RoleCode'),
            Description=data.get('Description'),
        )
        new_role.save()
        return new_role, HTTPStatus.CREATED

@user_role_namespace.route("/roles/<roleId>")
class GetListrole(Resource):
    def get(self,roleId):
        """
            get role by id
        """
        roles = Role.query.get(roleId)
        
        if roles is not None:
            role_schema = RoleSchema(many=False)
            data = role_schema.dump(roles)
            return data,HTTPStatus.OK
        else:
            abort(404, f"role {roleId} not found")
    
    def delete(self,roleId):
        """
            Delete an role with id
        """
        role = Role.query.filter_by(Id=roleId).first()
        if role is not None:
            db.session.delete(role)
            db.session.commit()
            return roleId, HTTPStatus.OK
        else:
            abort(404, f"role {roleId} not found")
