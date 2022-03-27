package xyz.cornerstone.ledger;

import io.grpc.stub.StreamObserver;

import java.util.Comparator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

/**
 * Implementation of ledgerService.
 */
final class LedgerService extends LedgerServiceGrpc.LedgerServiceImplBase {

    private final Map<String, AtomicInteger> currenciesTotal = new ConcurrentHashMap<>();

    @Override
    public void recordMinting(RecordMintingRequest request, StreamObserver<RecordMintingResponse> responseObserver) {
        AtomicInteger total = currenciesTotal.computeIfAbsent(request.getCurrencyName(), s -> new AtomicInteger(0));
        int newAmount = total.addAndGet(request.getIncrement());
        responseObserver.onNext(RecordMintingResponse.newBuilder().setNewAmount(newAmount).build());
        responseObserver.onCompleted();
    }

    @SuppressWarnings("Convert2MethodRef")
    @Override
    public void getTopMintedCurrencies(GetTopMintedCurrenciesRequest request, StreamObserver<GetTopMintedCurrenciesResponse> responseObserver) {
        Comparator<Map.Entry<String, AtomicInteger>> byValue = Comparator.comparing(e -> e.getValue().intValue());
        Map<String, Integer> topCurrencies = currenciesTotal.entrySet().stream()
                .sorted(byValue.reversed())
                .limit(request.getMaxNumberOfCurrencies())
                .collect(Collectors.toMap(
                        e -> e.getKey(),
                        e -> e.getValue().intValue()
                ));

        GetTopMintedCurrenciesResponse.Builder responseBuilder = GetTopMintedCurrenciesResponse.newBuilder();
        topCurrencies.forEach(
                (key, value) -> responseBuilder.addRecords(
                        TotalCurrencyMintedRecord.newBuilder()
                                .setCurrencyName(key)
                                .setAmount(value)
                                .build()));

        responseObserver.onNext(responseBuilder.build());
        super.getTopMintedCurrencies(request, responseObserver);
    }
}
