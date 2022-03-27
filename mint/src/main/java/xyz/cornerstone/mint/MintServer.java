package xyz.cornerstone.mint;

import io.grpc.Server;
import io.grpc.ServerBuilder;

import java.io.IOException;

/**
 * Mint entry point.
 */
public class MintServer {

    public static void main(String... args) throws IOException, InterruptedException {
        MintService mintService = new MintService();

        Server server = ServerBuilder.forPort(8091)
                .addService(mintService)
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
