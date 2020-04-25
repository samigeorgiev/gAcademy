import os
from concurrent import futures

import grpc

from service import PaymentService

from proto import payment_pb2_grpc

if __name__ == '__main__':
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    payment_pb2_grpc.add_PaymentServicer_to_server(PaymentService(), server)
    server.add_insecure_port('[::]:' + os.getenv('PORT'))
    server.start()
    server.wait_for_termination()
