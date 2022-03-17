package xyz.cornerstone.serviceC;

import io.grpc.Server;
import io.grpc.ServerBuilder;

import java.io.IOException;

/**
 * ServerC entry point.
 */
public class ServerC {

    public static void main(String... args) throws IOException, InterruptedException {
        ServiceC serviceC = new ServiceC();

        Server server = ServerBuilder.forPort(8092)
                .addService(serviceC)
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
