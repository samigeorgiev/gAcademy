package edu.gacademy.account_operations;

import edu.gacademy.account_operations.grpc.AccountOperationsServer;
import edu.gacademy.account_operations.grpc.clients.AuthClient;
import edu.gacademy.account_operations.grpc.interceptors.AuthInterceptor;
import edu.gacademy.account_operations.grpc.interceptors.ErrorHandlerInterceptor;
import edu.gacademy.account_operations.grpc.interceptors.SessionInterceptor;
import edu.gacademy.account_operations.grpc.prototypes.AccountOperationsGrpc.AccountOperationsImplBase;
import edu.gacademy.account_operations.repositories.CourseRepository;
import edu.gacademy.account_operations.repositories.CourseRepositoryImpl;
import edu.gacademy.account_operations.repositories.UserRepository;
import edu.gacademy.account_operations.repositories.UserRepositoryImpl;
import edu.gacademy.account_operations.grpc.service.AccountOperationsImpl;
import io.grpc.ServerInterceptor;
import org.hibernate.SessionFactory;

public class Main {

    public static void main(String[] args) {
        SessionFactory sessionFactory = HibernateConfig.createSessionFactory();
        UserRepository userRepository = new UserRepositoryImpl(sessionFactory);
        CourseRepository courseRepository = new CourseRepositoryImpl(sessionFactory);
        AccountOperationsImplBase accountOperationsService =
                new AccountOperationsImpl(userRepository, courseRepository);
        ServerInterceptor authInterceptor = new AuthInterceptor();
        ServerInterceptor errorHandlerInterceptor = new ErrorHandlerInterceptor();
        ServerInterceptor sessionInterceptor = new SessionInterceptor(sessionFactory);

        AuthClient.init(System.getenv("AUTH_URL"));

        AccountOperationsServer server = new AccountOperationsServer(
                accountOperationsService,
                authInterceptor, errorHandlerInterceptor, sessionInterceptor
        );

        try {
            server.start();
            // TODO logging
            server.blockUntilShutdown();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
