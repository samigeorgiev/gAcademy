import grpc
import paypalrestsdk

from models import *

from proto.payment_pb2_grpc import PaymentServicer
from proto.payment_pb2 import StartPaymentResponse, ExecutePaymentResponse


class PaymentService(PaymentServicer):

    def __init__(self, Session):
        self._Session = Session

    def StartPayment(self, request, context):
        session = self._Session()

        enrollment = session.query(Enrollment).\
            filter_by(id = request.enrollmentId).first()
        if enrollment == None:
            context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
            context.set_details('Invalid enrollment id')
            session.close()
            return StartPaymentResponse()

        payment_object = self._create_payment_object(
            name = enrollment.course.title,
            description = enrollment.course.description,
            id = str(enrollment.id),
            # price = enrollment.course.price,
            price = '25.00',
            return_url = request.returnUrl,
            cancel_url = request.cancelUrl
        )
        payment = paypalrestsdk.Payment(payment_object)
        if not payment.create():
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Payment creation failed')
            session.close()
            return StartPaymentResponse()

        redirecUrl = None
        for url in payment.links:
            if url.rel == 'approval_url':
                redirecUrl = str(url.href)

        session.commit()
        session.close()
        return StartPaymentResponse(redirectUrl = redirecUrl)

    def ExecutePayment(self, request, context):
        payment = None
        try:
            payment = paypalrestsdk.Payment.find(request.paymentId)
        except:
            context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
            context.set_details('Invalid payment id')
            return ExecutePaymentResponse()

        if not payment.execute({'payer_id': request.payerId}):
            context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
            context.set_details('Invalid payer id')
            return ExecutePaymentResponse()

        session = self._Session()
        enrollment_id = self._get_sku_from_payment(payment)
        enrollment = session.query(Enrollment).\
            filter_by(id = enrollment_id).first()
        enrollment.payment = Payment()
        session.add(enrollment)
        session.commit()
        session.close()

        return ExecutePaymentResponse()

    def _create_payment_object(self, **kwargs):
        return {
            'intent': 'sale',
            'payer': {
                'payment_method': 'paypal'
            },
            'application_context': {
                'brand_name': 'gAcademy',
                'shipping_preference': 'NO_SHIPPING' 
            },
            'transactions': [{
                'description': 'Education courses from gAcademy',
                'item_list': {
                    'items': [{
                        'name': kwargs['name'],
                        'description': kwargs['description'],
                        'sku': kwargs['id'],
                        'price': kwargs['price'],
                        'currency': 'EUR',
                        'quantity': '1'
                    }]
                },
                'amount': {
                    'total': kwargs['price'],
                    'currency': 'EUR'
                }
            }],
            'redirect_urls': {
                'return_url': kwargs['return_url'],
                'cancel_url': kwargs['cancel_url']
            }
        }

    def _get_sku_from_payment(self, payment):
        return payment.to_dict()['transactions'][0]['item_list']['items'][0]['sku']