package edu.gacademy.account_operations;

import edu.gacademy.account_operations.grpc.AccountOperationsServer;
import edu.gacademy.account_operations.proto.AccountOperationsGrpc.AccountOperationsImplBase;
import edu.gacademy.account_operations.service.AccountOperationsImpl;
import edu.gacademy.account_operations.util.HibernateConfig;
import org.hibernate.SessionFactory;

public class Main {

    public static void main(String[] args) {
        System.out.println(System.getenv("DB_URL"));
        SessionFactory sf = HibernateConfig.configSessionFactory();
        AccountOperationsImplBase accountOperationsService =
                new AccountOperationsImpl();
        AccountOperationsServer server =
                new AccountOperationsServer(accountOperationsService);
        try {
            server.start();
            server.blockUntilShutdown();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
