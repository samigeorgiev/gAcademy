package edu.gacademy.account_operations.grpc;

import edu.gacademy.account_operations.grpc.protocols.AccountOperationsGrpc;
import io.grpc.Server;
import io.grpc.ServerBuilder;
import io.grpc.ServerInterceptor;
import io.grpc.ServerInterceptors;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class AccountOperationsServer {

    private Server server;

    private AccountOperationsGrpc.AccountOperationsImplBase accountOperationsService;

    private ServerInterceptor authenticationInterceptor;

    private ServerInterceptor errorHandlerInterceptor;

    private ServerInterceptor sessionInterceptor;

    public AccountOperationsServer(
            AccountOperationsGrpc.AccountOperationsImplBase accountOperationsService,
            ServerInterceptor authenticationInterceptor,
            ServerInterceptor errorHandlerInterceptor,
            ServerInterceptor sessionInterceptor
    ) {
        this.accountOperationsService = accountOperationsService;
        this.authenticationInterceptor = authenticationInterceptor;
        this.errorHandlerInterceptor = errorHandlerInterceptor;
        this.sessionInterceptor = sessionInterceptor;
    }

    public void start() throws IOException {
        int port = 9002;
        server = ServerBuilder
                .forPort(port)
                .addService(ServerInterceptors.intercept(
                        accountOperationsService,
                        errorHandlerInterceptor,
                        authenticationInterceptor,
                        sessionInterceptor
                ))
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
