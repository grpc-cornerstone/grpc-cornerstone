package xyz.cornerstone.ledger;

import io.grpc.Server;
import io.grpc.ServerBuilder;

import java.io.IOException;

/**
 * LedgerServer entry point.
 */
public class LedgerServer {

    public static void main(String... args) throws IOException, InterruptedException {
        LedgerService ledgerService = new LedgerService();

        Server server = ServerBuilder.forPort(8092)
                .addService(ledgerService)
                .build();
        server.start();


        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            try {
                server.shutdown().awaitTermination();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }));
        server.awaitTermination();

    }

}
