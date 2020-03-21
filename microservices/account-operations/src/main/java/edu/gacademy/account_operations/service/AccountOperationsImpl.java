package edu.gacademy.account_operations.service;

import edu.gacademy.account_operations.proto.AccountOperationsGrpc;
import edu.gacademy.account_operations.proto.GetNextLessonRequest;
import edu.gacademy.account_operations.proto.GetNextLessonResponse;
import io.grpc.stub.StreamObserver;

public class AccountOperationsImpl extends AccountOperationsGrpc.AccountOperationsImplBase {

    @Override
    public void getNextLesson(GetNextLessonRequest request, StreamObserver<GetNextLessonResponse> responseObserver) {
        GetNextLessonResponse response = GetNextLessonResponse.newBuilder().setRess("test").build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
