package edu.gacademy.account_operations.grpc.clients;

import edu.gacademy.authentication.grpc.protocols.AuthenticationGrpc;
import edu.gacademy.authentication.grpc.protocols.GetUserIdRequest;
import edu.gacademy.authentication.grpc.protocols.GetUserIdResponse;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.Status;
import io.grpc.StatusRuntimeException;

import java.util.concurrent.TimeUnit;

public class AuthenticationClient {

    private static ManagedChannel channel;

    private static AuthenticationGrpc.AuthenticationBlockingStub blockingStub;

    private AuthenticationClient() {
    }

    public static void init(String url) {
        channel = ManagedChannelBuilder.forTarget(url).usePlaintext().build();
        blockingStub = AuthenticationGrpc.newBlockingStub(channel);
    }

    public static int getUserId(String token) throws StatusRuntimeException {
        GetUserIdRequest request = GetUserIdRequest.newBuilder().setToken(token).build();
        GetUserIdResponse response;
        try {
            response = blockingStub.getUserId(request);
        } catch (StatusRuntimeException e) {
            throw wrapException(e);
        }
        return response.getUserId();
    }

    public static void destroy() throws InterruptedException {
        channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
    }

    private static StatusRuntimeException wrapException(StatusRuntimeException e) {
        String[] splitMessage = e.getMessage().split(" ", 3);
        int statusCode;
        if (splitMessage.length >= 2) {
            statusCode = Integer.parseInt(splitMessage[1]);
        } else {
            statusCode = Status.UNKNOWN.getCode().value();
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
