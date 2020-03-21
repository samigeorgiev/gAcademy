package edu.gacademy.account_operations.grpc;

import edu.gacademy.account_operations.proto.AccountOperationsGrpc.AccountOperationsImplBase;
import edu.gacademy.account_operations.service.AccountOperationsImpl;
import io.grpc.Server;
import io.grpc.ServerBuilder;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class AccountOperationsServer {

    private Server server;

    private AccountOperationsImplBase accountOperationsService;

    public AccountOperationsServer(
            AccountOperationsImplBase accountOperationsService
    ) {
        this.accountOperationsService = accountOperationsService;
    }

    public void start() throws IOException {
        int port = 9002;
        server = ServerBuilder
                .forPort(port)
                .addService(accountOperationsService)
                .build()
                .start();

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            try {
                AccountOperationsServer.this.stop();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }));
    }

    public void stop() throws InterruptedException {
        if (server != null) {
            server.shutdown().awaitTermination(30, TimeUnit.SECONDS);
        }
    }

    public void blockUntilShutdown() throws InterruptedException {
        if (server != null) {
            server.awaitTermination();
        }
    }
}
