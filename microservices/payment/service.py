from proto.payment_pb2_grpc import PaymentServicer
from proto.payment_pb2 import StartPaymentResponse


class PaymentService(PaymentServicer):
    def StartPayment(self, request, context):
        print(request)
        return StartPaymentResponse(message='Hello')
