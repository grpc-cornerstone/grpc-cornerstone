package xyz.cornerstone.mint;

import brave.Tracing;
import brave.grpc.GrpcTracing;
import brave.rpc.RpcTracing;
import io.grpc.*;
import xyz.cornerstone.ledger.LedgerServiceGrpc;

import java.io.IOException;
import java.io.InputStream;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/**
 * Mint entry point.
 */
public class MintServer {

    private static Logger LOG = null;

    static {
        InputStream stream = MintServer.class.getClassLoader().
                getResourceAsStream("logging.properties");
        try {
            LogManager.getLogManager().readConfiguration(stream);
            LOG = Logger.getLogger(MintServer.class.getName());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String... args) throws IOException, InterruptedException {
        LOG.info("Starting Mint service");

        GrpcTracing grpcTracing = GrpcTracing.create(RpcTracing.newBuilder(Tracing.newBuilder().build()).build());

        String ledgerHost = System.getenv().getOrDefault("LEDGER_SERVICE_HOST", "localhost");
        String ledgerPort = System.getenv().getOrDefault("LEDGER_SERVICE_PORT", "8092");
        ManagedChannel channel = ManagedChannelBuilder
                .forAddress(ledgerHost, Integer.parseInt(ledgerPort))
                .usePlaintext()
                .intercept(grpcTracing.newClientInterceptor())
                .build();

        LedgerServiceGrpc.LedgerServiceBlockingStub client = LedgerServiceGrpc.newBlockingStub(channel);

        MintService mintService = new MintService(client);

        Server server = ServerBuilder.forPort(8091)
                .addService(ServerInterceptors.intercept(mintService, grpcTracing.newServerInterceptor()))
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
