package edu.gacademy.accountoperations.clients;

import edu.gacademy.authentication.grpc.protocols.AuthenticationGrpc;
import edu.gacademy.authentication.grpc.protocols.GetUserIdRequest;
import edu.gacademy.authentication.grpc.protocols.GetUserIdResponse;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.Status;
import io.grpc.StatusRuntimeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationClient {

    private final AuthenticationGrpc.AuthenticationBlockingStub stub;

    @Autowired
    public AuthenticationClient(@Value("${authentication.url}") String url) {
        ManagedChannel channel = ManagedChannelBuilder.forTarget(url).usePlaintext().build();
        stub = AuthenticationGrpc.newBlockingStub(channel);
    }

    public int getUserId(String token) throws StatusRuntimeException {
        GetUserIdRequest request = GetUserIdRequest.newBuilder().setToken(token).build();
        GetUserIdResponse response;
        try {
            response = stub.getUserId(request);
        } catch (StatusRuntimeException e) {
            throw wrapException(e);
        }
        return response.getUserId();
    }

    private StatusRuntimeException wrapException(StatusRuntimeException e) {
        if (e.getStatus() != Status.UNKNOWN) {
            return e;
        }
        String[] splitMessage = e.getMessage().split(" ", 3);
        int statusCode = Status.UNKNOWN.getCode().value();
        if (splitMessage.length >= 2) {
            try {
                statusCode = Integer.parseInt(splitMessage[1]);
            } catch (NumberFormatException ignored) {

            }
        }
        String message;
        if (splitMessage.length >= 3) {
            message = splitMessage[2];
        } else {
            message = "Unknown error";
        }
        return Status.fromCodeValue(statusCode).withDescription(message).asRuntimeException();
    }
}
