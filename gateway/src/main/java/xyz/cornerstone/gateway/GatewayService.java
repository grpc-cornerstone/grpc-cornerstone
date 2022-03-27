package xyz.cornerstone.gateway;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.stub.StreamObserver;
import xyz.cornerstone.gateway.*;
import xyz.cornerstone.ledger.GetTopMintedCurrenciesRequest;
import xyz.cornerstone.ledger.GetTopMintedCurrenciesResponse;
import xyz.cornerstone.ledger.LedgerServiceGrpc;
import xyz.cornerstone.mint.*;

/**
 * Implementation of Gateway service
 */
final class GatewayService extends GatewayServiceGrpc.GatewayServiceImplBase {

    private final LedgerServiceGrpc.LedgerServiceBlockingStub ledgerClient;
    private final MintServiceGrpc.MintServiceBlockingStub mintClient;


    GatewayService() {
        ManagedChannel ledgerChannel = ManagedChannelBuilder.forAddress("localhost", 8091).usePlaintext().build();
        ledgerClient = LedgerServiceGrpc.newBlockingStub(ledgerChannel);

        ManagedChannel mintChannel = ManagedChannelBuilder.forAddress("localhost", 8092).usePlaintext().build();
        mintClient = MintServiceGrpc.newBlockingStub(mintChannel);

    }

    @Override
    public void createCurrency(CreateCurrencyGatewayRequest request, StreamObserver<CreateCurrencyGatewayResponse> responseObserver) {
        CreateCurrencyResponse response = mintClient.createCurrency(CreateCurrencyRequest.getDefaultInstance());
        responseObserver.onNext(CreateCurrencyGatewayResponse.newBuilder()
                .setCurrencyName(response.getCurrencyName())
                .build());
        responseObserver.onCompleted();
    }

    @Override
    public void mint(MintGatewayRequest request, StreamObserver<MintGatewayResponse> responseObserver) {
        MintResponse response = mintClient.mint(MintRequest.newBuilder()
                .setCurrencyName(request.getCurrencyName())
                .build());
        responseObserver.onNext(MintGatewayResponse.newBuilder()
                .setNewAmount(response.getNewAmount())
                .build());
        responseObserver.onCompleted();
    }

    @Override
    public void getTopMintedCurrencies(GetTopMintedCurrenciesGatewayRequest request, StreamObserver<GetTopMintedCurrenciesGatewayResponse> responseObserver) {
        GetTopMintedCurrenciesResponse topMintedCurrencies = ledgerClient.getTopMintedCurrencies(GetTopMintedCurrenciesRequest.newBuilder()
                .setMaxNumberOfCurrencies(request.getMaxNumberOfCurrencies())
                .build());

        GetTopMintedCurrenciesGatewayResponse.Builder responseBuilder = GetTopMintedCurrenciesGatewayResponse.newBuilder();
        topMintedCurrencies.getRecordsList().forEach(
                r -> responseBuilder.addRecords(TotalCurrencyMintedGatewayRecord.newBuilder()
                        .setCurrencyName(r.getCurrencyName())
                        .setAmount(r.getAmount())
                        .build())
        );

        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }
}
