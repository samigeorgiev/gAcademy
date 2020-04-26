import os
from concurrent import futures

import grpc
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from service import PaymentService

from proto import payment_pb2_grpc

def set_up_Session_factory():
    engine = create_engine(os.getenv('DB_URL'), echo = True)
    return sessionmaker(bind = engine)

if __name__ == '__main__':
    Session = set_up_Session_factory()
    server = grpc.server(futures.ThreadPoolExecutor(max_workers = 10))
    payment_pb2_grpc.add_PaymentServicer_to_server(PaymentService(Session), server)
    server.add_insecure_port('[::]:' + os.getenv('PORT'))
    server.start()
    server.wait_for_termination()
