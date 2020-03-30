package edu.gacademy.account_operations.grpc.calls;

import io.grpc.ForwardingServerCall;
import io.grpc.Metadata;
import io.grpc.ServerCall;
import io.grpc.Status;

public class ErrorHandledCall<ReqT, RespT> extends ForwardingServerCall.SimpleForwardingServerCall<ReqT, RespT> {

    public ErrorHandledCall(ServerCall<ReqT, RespT> delegate) {
        super(delegate);
    }

    @Override
    public void close(Status status, Metadata trailers) {
        // TODO add logging
        System.out.println(status);
        super.close(status, trailers);
    }
}
