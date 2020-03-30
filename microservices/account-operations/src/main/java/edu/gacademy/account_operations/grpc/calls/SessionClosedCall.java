package edu.gacademy.account_operations.grpc.calls;

import io.grpc.ForwardingServerCall;
import io.grpc.Metadata;
import io.grpc.ServerCall;
import io.grpc.Status;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

public class SessionClosedCall<ReqT, RespT> extends ForwardingServerCall.SimpleForwardingServerCall<ReqT, RespT> {

    private SessionFactory sessionFactory;

    public SessionClosedCall(ServerCall<ReqT, RespT> delegate, SessionFactory sessionFactory) {
        super(delegate);
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void close(Status status, Metadata trailers) {
        Session session = sessionFactory.getCurrentSession();
        if (status.isOk()) {
            session.getTransaction().commit();
        } else {
            session.getTransaction().rollback();
        }
        session.close();
        super.close(status, trailers);
    }
}
