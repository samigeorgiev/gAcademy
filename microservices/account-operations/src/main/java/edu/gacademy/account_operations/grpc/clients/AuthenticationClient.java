package edu.gacademy.account_operations.grpc.clients;

import edu.gacademy.authentication.grpc.prototypes.AuthenticationGrpc;
import edu.gacademy.authentication.grpc.prototypes.GetUserIdRequest;
import edu.gacademy.authentication.grpc.prototypes.GetUserIdResponse;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
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
        GetUserIdResponse response = blockingStub.getUserId(request);
        return response.getUserId();
    }

    public static void destroy() throws InterruptedException {
        channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
    }
}
