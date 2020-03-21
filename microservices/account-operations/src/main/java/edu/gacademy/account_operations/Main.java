package edu.gacademy.account_operations;

import edu.gacademy.account_operations.grpc.AccountOperationsServer;
import edu.gacademy.account_operations.grpc.interceptors.AuthInterceptor;
import edu.gacademy.account_operations.grpc.prototypes.AccountOperationsGrpc.AccountOperationsImplBase;
import edu.gacademy.account_operations.repositories.UserRepository;
import edu.gacademy.account_operations.repositories.UserRepositoryImpl;
import edu.gacademy.account_operations.grpc.service.AccountOperationsImpl;
import edu.gacademy.account_operations.util.HibernateConfig;
import io.grpc.ServerInterceptor;
import org.hibernate.SessionFactory;

public class Main {

    public static void main(String[] args) {
        System.out.println(System.getenv("DB_URL"));
        SessionFactory sessionFactory = HibernateConfig.configSessionFactory();
        UserRepository userRepository = new UserRepositoryImpl(sessionFactory);
        AccountOperationsImplBase accountOperationsService =
                new AccountOperationsImpl(userRepository);
        ServerInterceptor authInterceptor = new AuthInterceptor();
        AccountOperationsServer server = new AccountOperationsServer(
                accountOperationsService, authInterceptor
        );
        try {
            server.start();
            server.blockUntilShutdown();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
