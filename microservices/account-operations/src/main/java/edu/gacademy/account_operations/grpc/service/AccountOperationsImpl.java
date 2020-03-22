// TODO add logging

package edu.gacademy.account_operations.grpc.service;

import edu.gacademy.account_operations.entities.User;
import edu.gacademy.account_operations.grpc.ContextEntries;
import edu.gacademy.account_operations.grpc.prototypes.*;
import edu.gacademy.account_operations.repositories.UserRepository;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import org.hibernate.HibernateException;
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
        Session session;
        try {
            session = sessionFactory.getCurrentSession();
        } catch (HibernateException e) {
            responseObserver.onError(Status.INTERNAL
                    .withDescription("Hibernate exception")
                    .withCause(e)
                    .asRuntimeException());
            return;
        }
        session.beginTransaction();
        int userId = ContextEntries.USER_ID.get();
        User user = userRepository.getById(userId);
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

    @Override
    public void becomeTeacher(BecomeTeacherRequest request, StreamObserver<BecomeTeacherResponse> responseObserver) {
        Session session;
        try {
            session = sessionFactory.getCurrentSession();
        } catch (HibernateException e) {
            responseObserver.onError(Status.INTERNAL
                    .withDescription("Hibernate error")
                    .withCause(e)
                    .asRuntimeException());
            return;
        }
        session.beginTransaction();
        int userId = ContextEntries.USER_ID.get();
        User user = userRepository.getById(userId);
        if (user.getTeacher() != null) {
            responseObserver.onError(Status.ALREADY_EXISTS
                    .withDescription("User is already a teacher")
                    .asRuntimeException()
            );
            return;
        }
        userRepository.becomeTeacher(user);
        session.getTransaction().commit();
        session.close();
        responseObserver.onNext(BecomeTeacherResponse.newBuilder().build());
        responseObserver.onCompleted();
    }
}
