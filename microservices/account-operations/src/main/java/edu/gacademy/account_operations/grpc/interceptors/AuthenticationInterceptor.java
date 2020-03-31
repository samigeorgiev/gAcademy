package edu.gacademy.account_operations.grpc.interceptors;

import edu.gacademy.account_operations.grpc.ContextEntries;
import edu.gacademy.account_operations.grpc.clients.AuthenticationClient;
import io.grpc.*;

public class AuthenticationInterceptor implements ServerInterceptor {

    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(
            ServerCall<ReqT, RespT> serverCall,
            Metadata metadata,
            ServerCallHandler<ReqT, RespT> serverCallHandler
    ) {
        Metadata.Key<String> authorizationKey = Metadata.Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER);
        String token = metadata.get(authorizationKey);

        int userId;
        try {
            if (token == null) {
                throw new StatusRuntimeException(Status.UNAUTHENTICATED);
            }
            userId = AuthenticationClient.getUserId(token);
        } catch (StatusRuntimeException e) {
            Metadata trailers = new Metadata();
            serverCall.close(e.getStatus(), trailers);
            // TODO logging
            return new ServerCall.Listener<>() {};
        }

        Context context = Context.current().withValue(ContextEntries.USER_ID, userId);

        return Contexts.interceptCall(context, serverCall, metadata, serverCallHandler);
    }
}
