package xyz.cornerstone.serviceA;

import io.grpc.Server;
import io.grpc.ServerBuilder;

import java.io.IOException;

/**
 * ServerB entry point.
 */
public class ServerA {

    public static void main(String... args) throws IOException, InterruptedException {
        ServiceA serviceA = new ServiceA();

        Server server = ServerBuilder.forPort(8090)
                .addService(serviceA)
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
