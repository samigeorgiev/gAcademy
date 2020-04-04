package edu.gacademy.account_operations.grpc.interceptors;

import edu.gacademy.account_operations.grpc.calls.SessionClosedCall;
import io.grpc.*;
import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;

public class SessionInterceptor implements ServerInterceptor {

    private SessionFactory sessionFactory;

    public SessionInterceptor(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(
            ServerCall<ReqT, RespT> serverCall,
            Metadata metadata,
            ServerCallHandler<ReqT, RespT> serverCallHandler
    ) {
        try {
            sessionFactory.getCurrentSession().beginTransaction();
        } catch (HibernateException e) {
            Metadata trailers = new Metadata();
            Metadata.Key<String> error = Metadata.Key.of("Error", Metadata.ASCII_STRING_MARSHALLER);
            trailers.put(error, "Hibernate error");
            serverCall.close(Status.INTERNAL, trailers);
            // TODO logging
            return new ServerCall.Listener<>() {};
        }
        ServerCall<ReqT, RespT> sessionClosedCall =
                new SessionClosedCall<>(serverCall, sessionFactory);
        return serverCallHandler.startCall(sessionClosedCall, metadata);
    }
}
