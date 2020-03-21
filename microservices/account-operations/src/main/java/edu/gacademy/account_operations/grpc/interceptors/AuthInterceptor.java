package edu.gacademy.account_operations.grpc.interceptors;

import io.grpc.*;

public class AuthInterceptor implements ServerInterceptor {

    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(
            ServerCall<ReqT, RespT> serverCall,
            Metadata metadata,
            ServerCallHandler<ReqT, RespT> serverCallHandler
    ) {
        Metadata.Key<String> authorization =
                Metadata.Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER);
        String jwt = metadata.get(authorization);

        if (jwt == null) {
            serverCall.close(
                    Status.UNAUTHENTICATED.withDescription("Missing JWT"),
                    metadata
            );
            return new ServerCall.Listener<ReqT>() {};
        }

        Context context;
        return null;
    }
}
