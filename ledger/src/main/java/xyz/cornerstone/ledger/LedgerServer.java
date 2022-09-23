package xyz.cornerstone.ledger;

import brave.Tracing;
import brave.grpc.GrpcTracing;
import brave.rpc.RpcTracing;
import io.grpc.Server;
import io.grpc.ServerBuilder;
import io.grpc.ServerInterceptors;

import java.io.IOException;
import java.io.InputStream;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/**
 * LedgerServer entry point.
 */
public class LedgerServer {
    private static Logger LOG = null;

    static {
        InputStream stream = LedgerServer.class.getClassLoader().
                getResourceAsStream("logging.properties");
        try {
            LogManager.getLogManager().readConfiguration(stream);
            LOG = Logger.getLogger(LedgerServer.class.getName());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public static void main(String... args) throws IOException, InterruptedException {
        LOG.info("Starting Ledger service");
        GrpcTracing grpcTracing = GrpcTracing.create(RpcTracing.newBuilder(Tracing.newBuilder().build()).build());

        LedgerService ledgerService = new LedgerService();

        Server server = ServerBuilder.forPort(8092)
                .addService(ServerInterceptors.intercept(ledgerService, grpcTracing.newServerInterceptor()))
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
