from flask_restx import Namespace, Resource

auth_namespace=Namespace('auth', description="a namspace for authentication")

@auth_namespace.route('/signup')
# class HelloAuth(Resource):

#     def get(self):
#         return {"message" : "hello auth"}

class SignUp(Resource):

    def post(self):
        """
            create a new user account
        """
        pass
    
@auth_namespace.route('/login')
class Login(Resource):

    def post(self):
        """
            Generate jwt a pair
        """
        pass