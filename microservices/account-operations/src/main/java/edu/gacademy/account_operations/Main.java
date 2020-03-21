package edu.gacademy.account_operations;

import edu.gacademy.account_operations.grpc.AccountOperationsServer;

public class Main {

    public static void main(String[] args) {
        System.out.println(System.getenv("DB_URL"));
        AccountOperationsServer server = new AccountOperationsServer();
        try {
            server.start();

            server.blockUntilShutdown();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
