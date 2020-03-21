package edu.gacademy.account_operations.grpc.service;

import edu.gacademy.account_operations.grpc.prototypes.AccountOperationsGrpc;
import edu.gacademy.account_operations.grpc.prototypes.GetAccountRequest;
import edu.gacademy.account_operations.grpc.prototypes.GetAccountResponse;
import edu.gacademy.account_operations.repositories.UserRepository;
import io.grpc.stub.StreamObserver;

public class AccountOperationsImpl extends AccountOperationsGrpc.AccountOperationsImplBase {

    private UserRepository userRepository;

    public AccountOperationsImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void getAccount(GetAccountRequest request, StreamObserver<GetAccountResponse> responseObserver) {
        System.out.println(request);
    }
}
