package xyz.cornerstone.mint;

import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.MoreExecutors;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.stub.StreamObserver;
import xyz.cornerstone.ledger.LedgerServiceGrpc;
import xyz.cornerstone.ledger.RecordMintingRequest;
import xyz.cornerstone.ledger.RecordMintingResponse;
import xyz.cornerstone.serviceB.CallBRequest;
import xyz.cornerstone.serviceB.CallBResponse;
import xyz.cornerstone.serviceB.ServiceBGrpc;
import xyz.cornerstone.serviceC.CallCRequest;
import xyz.cornerstone.serviceC.ServiceCGrpc;

import java.util.Random;

/**
 * Implementation of Mint service
 */
final class MintService extends MintServiceGrpc.MintServiceImplBase {

    private final LedgerServiceGrpc.LedgerServiceBlockingStub client;
    private final CoinNameGenerator coinNameGenerator;
    private final Random rnd;


    MintService() {
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 8092).usePlaintext().build();

        client = LedgerServiceGrpc.newBlockingStub(channel);
        coinNameGenerator = new CoinNameGenerator();
        rnd = new Random();
    }

    @Override
    public void createCurrency(CreateCurrencyRequest request, StreamObserver<CreateCurrencyResponse> responseObserver) {
        String newCurrencyName = coinNameGenerator.generateRandomName();

        client.recordMinting(RecordMintingRequest.newBuilder()
                .setCurrencyName(newCurrencyName)
                .setIncrement(0)
                .build());

        responseObserver.onNext(CreateCurrencyResponse.newBuilder()
                .setCurrencyName(newCurrencyName)
                .build());

        responseObserver.onCompleted();

    }

    @Override
    public void mint(MintRequest request, StreamObserver<MintResponse> responseObserver) {
        int randomIncrement = rnd.nextInt(100);

        RecordMintingResponse response = client.recordMinting(RecordMintingRequest.newBuilder()
                .setCurrencyName(request.getCurrencyName())
                .setIncrement(randomIncrement)
                .build());

        responseObserver.onNext(MintResponse.newBuilder()
                .setNewAmount(response.getNewAmount())
                .build());

        responseObserver.onCompleted();
    }

}
