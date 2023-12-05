from flask_restx import Namespace, Resource

order_namespace=Namespace('orders', description="a namspace for orders")

@order_namespace.route('/orders')
class OrderGetCreate(Resource):
    def get(self):
        """
            Get all orders
        """
        pass

    def post(self):
        """
            place a new order
        """
        pass

@order_namespace.route('/orders/<int:order_id>')
class GetUpdateDelete(Resource):
    def get(self,order_id):
        """
            Retrieve an order by id
        """
        pass

    def put(self,order_id):
        """
            Update an order with id
        """
        pass

    def delete(self,order_id):
        """
            Delete an order with id
        """
        pass

