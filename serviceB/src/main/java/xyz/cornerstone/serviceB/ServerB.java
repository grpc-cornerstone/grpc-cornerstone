package xyz.cornerstone.serviceB;

import io.grpc.Server;
import io.grpc.ServerBuilder;

import java.io.IOException;

/**
 * ServerB entry point.
 */
public class ServerB {

    public static void main(String... args) throws IOException, InterruptedException {
        ServiceB serviceB = new ServiceB();

        Server server = ServerBuilder.forPort(8091)
                .addService(serviceB)
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
