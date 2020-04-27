import unittest
from unittest.mock import Mock, patch

import grpc

from service import PaymentService


class TestPaymentService(unittest.TestCase):

    def setUp(self):
        self._service = PaymentService(None)

    @patch('service.paypalrestsdk')
    def test_startPayment_returns_invalid_argument_for_enrollmentId(
        self, mocked_api
    ):
        context = Mock()
        request = Mock()
        request.enrollmentId = -1

        self._service._Session = Mock()
        session = self._service._Session.return_value
        session.query.return_value.filter_by = Mock()
        session.query.return_value.filter_by.return_value\
            .first.return_value = None

        self._service.StartPayment(request, context)

        session.query.return_value.filter_by.assert_called_with(id=-1)
        session.close.assert_called()
        context.set_code.assert_called_with(grpc.StatusCode.INVALID_ARGUMENT)
        context.set_details.assert_called_with('Invalid enrollment id')


if __name__ == '__main__':
    unittest.main()
