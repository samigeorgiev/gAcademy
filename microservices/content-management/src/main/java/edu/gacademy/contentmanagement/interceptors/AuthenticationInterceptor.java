package edu.gacademy.contentmanagement.interceptors;

import edu.gacademy.contentmanagement.clients.AuthenticationClient;
import edu.gacademy.contentmanagement.entities.User;
import edu.gacademy.contentmanagement.repositories.UserRepository;
import edu.gacademy.contentmanagement.services.ContextEntries;
import io.grpc.*;
import org.lognet.springboot.grpc.GRpcGlobalInterceptor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@GRpcGlobalInterceptor
public class AuthenticationInterceptor implements ServerInterceptor {

    private final AuthenticationClient authenticationClient;

    private final UserRepository userRepository;

    @Autowired
    public AuthenticationInterceptor(
            AuthenticationClient authenticationClient,
            UserRepository userRepository
    ) {
        this.authenticationClient = authenticationClient;
        this.userRepository = userRepository;
    }

    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(
            ServerCall<ReqT, RespT> serverCall,
            Metadata metadata,
            ServerCallHandler<ReqT, RespT> serverCallHandler
    ) {
        Metadata.Key<String> authorizationKey =
                Metadata.Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER);
        String token = metadata.get(authorizationKey);

        Context context;

        int userId;
        try {
            userId = getUserIdFromToken(token);
        } catch (StatusRuntimeException e) {
            context = Context.current().withValue(ContextEntries.AUTHENTICATION_ERROR, e);
            return Contexts.interceptCall(context, serverCall, metadata, serverCallHandler);
        }

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            context = Context.current().withValue(
                    ContextEntries.AUTHENTICATION_ERROR,
                    new StatusRuntimeException(
                            Status.UNAUTHENTICATED.withDescription("User not found")
                    )
            );
            return Contexts.interceptCall(context, serverCall, metadata, serverCallHandler);
        }
        context = Context.current().withValue(ContextEntries.USER, userOptional.get());

        return Contexts.interceptCall(context, serverCall, metadata, serverCallHandler);
    }

    private int getUserIdFromToken(String token) {
        int userId;
        if (token == null) {
            throw new StatusRuntimeException(
                    Status.UNAUTHENTICATED.withDescription("Missing token")
            );
        }
        userId = authenticationClient.getUserId(token);
        return userId;
    }
}
