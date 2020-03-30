package edu.gacademy.account_operations.grpc.interceptors;

import edu.gacademy.account_operations.grpc.calls.ErrorHandledCall;
import io.grpc.*;

public class ErrorHandlerInterceptor implements ServerInterceptor {

    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(
            ServerCall<ReqT, RespT> serverCall,
            Metadata metadata,
            ServerCallHandler<ReqT, RespT> serverCallHandler
    ) {
        ServerCall<ReqT, RespT> errorHandledCall = new ErrorHandledCall<>(serverCall);
        return serverCallHandler.startCall(errorHandledCall, metadata);
    }
}
