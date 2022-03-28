package xyz.cornerstone.gateway;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.Server;
import io.grpc.ServerBuilder;
import xyz.cornerstone.ledger.LedgerServiceGrpc;
import xyz.cornerstone.mint.MintServiceGrpc;

import java.io.IOException;
import java.io.InputStream;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/**
 * Gateway entry point.
 */
public class GatewayServer {

    private static Logger LOG = null;

    static {
        InputStream stream = GatewayServer.class.getClassLoader().
                getResourceAsStream("logging.properties");
        try {
            LogManager.getLogManager().readConfiguration(stream);
            LOG = Logger.getLogger(GatewayServer.class.getName());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public static void main(String... args) throws IOException, InterruptedException {
        LOG.info("Starting Gateway service");
        String ledgerHost = System.getenv().getOrDefault("LEDGER_SERVICE_HOST", "localhost");
        String ledgerPort = System.getenv().getOrDefault("LEDGER_SERVICE_PORT", "8092");
        ManagedChannel ledgerChannel = ManagedChannelBuilder
                .forAddress(ledgerHost, Integer.parseInt(ledgerPort))
                .usePlaintext()
                .build();
        LedgerServiceGrpc.LedgerServiceBlockingStub ledgerClient = LedgerServiceGrpc.newBlockingStub(ledgerChannel);


        String mintHost = System.getenv().getOrDefault("MINT_SERVICE_HOST", "localhost");
        String mintPort = System.getenv().getOrDefault("MINT_SERVICE_PORT", "8091");
        ManagedChannel mintChannel = ManagedChannelBuilder
                .forAddress(mintHost, Integer.parseInt(mintPort))
                .usePlaintext()
                .build();
        MintServiceGrpc.MintServiceBlockingStub mintClient = MintServiceGrpc.newBlockingStub(mintChannel);

        GatewayService gatewayService = new GatewayService(ledgerClient, mintClient);

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
