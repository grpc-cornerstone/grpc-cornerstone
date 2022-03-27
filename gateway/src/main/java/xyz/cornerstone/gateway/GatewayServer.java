package xyz.cornerstone.gateway;

import io.grpc.Server;
import io.grpc.ServerBuilder;

import java.io.IOException;

/**
 * Gateway entry point.
 */
public class GatewayServer {

    public static void main(String... args) throws IOException, InterruptedException {
        GatewayService gatewayService = new GatewayService();

        Server server = ServerBuilder.forPort(8090)
                .addService(gatewayService)
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
