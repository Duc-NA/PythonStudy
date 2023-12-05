from flask_restx import Namespace, Resource

user_namespace=Namespace('users', description="a namspace for user")

@user_namespace.route('/users')
class GetUpdateDelete(Resource):
    def get(self,user_id):
        """
            Retrieve an user by id
        """
        pass

    def put(self,user_id):
        """
            Update an user with id
        """
        pass

    def delete(self,user_id):
        """
            Delete an user with id
        """
        pass
