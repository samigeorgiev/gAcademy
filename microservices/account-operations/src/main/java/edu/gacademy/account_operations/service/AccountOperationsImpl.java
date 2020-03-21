package edu.gacademy.account_operations.service;

import edu.gacademy.account_operations.prototypes.GetNextLessonRequest;
import edu.gacademy.account_operations.prototypes.AccountOperationsGrpc;
import edu.gacademy.account_operations.prototypes.GetNextLessonResponse;
import io.grpc.stub.StreamObserver;

public class AccountOperationsImpl extends AccountOperationsGrpc.AccountOperationsImplBase {

    @Override
    public void getNextLesson(GetNextLessonRequest request, StreamObserver<GetNextLessonResponse> responseObserver) {
        GetNextLessonResponse response = GetNextLessonResponse.newBuilder().setRess("test").build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
