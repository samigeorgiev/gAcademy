package edu.gacademy.accountoperations.interceptors;

import edu.gacademy.accountoperations.clients.AuthenticationClient;
import edu.gacademy.accountoperations.entities.User;
import edu.gacademy.accountoperations.repositories.UserRepository;
import edu.gacademy.accountoperations.service.ContextEntries;
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

        int userId;
        try {
            if (token == null) {
                throw new StatusRuntimeException(Status.UNAUTHENTICATED);
            }
            userId = authenticationClient.getUserId(token);
        } catch (StatusRuntimeException e) {
            serverCall.close(e.getStatus(), new Metadata());
            return new ServerCall.Listener<>() {};
        }

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            serverCall.close(Status.NOT_FOUND.withDescription("User not found"), new Metadata());
            return new ServerCall.Listener<>() {};
        }
        Context context = Context.current().withValue(ContextEntries.USER, userOptional.get());

        return Contexts.interceptCall(context, serverCall, metadata, serverCallHandler);
    }
}
