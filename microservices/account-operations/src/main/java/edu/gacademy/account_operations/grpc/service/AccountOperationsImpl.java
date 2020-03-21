package edu.gacademy.account_operations.grpc.service;

import edu.gacademy.account_operations.entities.User;
import edu.gacademy.account_operations.grpc.ContextEntries;
import edu.gacademy.account_operations.grpc.prototypes.AccountOperationsGrpc;
import edu.gacademy.account_operations.grpc.prototypes.GetAccountRequest;
import edu.gacademy.account_operations.grpc.prototypes.GetAccountResponse;
import edu.gacademy.account_operations.repositories.UserRepository;
import io.grpc.stub.StreamObserver;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

public class AccountOperationsImpl extends AccountOperationsGrpc.AccountOperationsImplBase {

    private UserRepository userRepository;

    private SessionFactory sessionFactory;

    public AccountOperationsImpl(UserRepository userRepository, SessionFactory sessionFactory) {
        this.userRepository = userRepository;
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void getAccount(GetAccountRequest request, StreamObserver<GetAccountResponse> responseObserver) {
        Session session = sessionFactory.getCurrentSession();
        session.beginTransaction();
        int userId = ContextEntries.USER_ID.get();
        User user = userRepository.getUserById(userId);
        GetAccountResponse response = GetAccountResponse.newBuilder()
                .setFirstName(user.getFirstName())
                .setLastName(user.getFirstName())
                .setEmail(user.getEmail())
                .setIsTeacher(user.getTeacher() != null)
                .build();
        session.getTransaction().commit();
        session.close();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
