package xyz.cornerstone.ledger;

import io.grpc.stub.StreamObserver;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Implementation of ledgerService.
 */
final class LedgerService extends LedgerServiceGrpc.LedgerServiceImplBase {

    private final Map<String, AtomicInteger> currenciesTotal = new ConcurrentHashMap<>();

    @Override
    public void recordMinting(RecordMintingRequest request, StreamObserver<RecordMintingResponse> responseObserver) {
        currenciesTotal.computeIfAbsent(request.getCurrencyName(), s -> new AtomicInteger(0));
        int newAmount = currenciesTotal.get(request.getCurrencyName()).addAndGet(request.getIncrement());
        responseObserver.onNext(RecordMintingResponse.newBuilder().setNewAmount(newAmount).build());
        responseObserver.onCompleted();
    }

    @Override
    public void getTopMintedCurrencies(GetTopMintedCurrenciesRequest request, StreamObserver<GetTopMintedCurrenciesResponse> responseObserver) {
        Comparator<Map.Entry<String, AtomicInteger>> byValue = Comparator.comparing(e -> e.getValue().intValue());
        List<CurrencyRecord> topRecords = currenciesTotal.entrySet().stream()
                .sorted(byValue.reversed())
                .limit(request.getMaxNumberOfCurrencies())
                .map(e -> new CurrencyRecord(e.getKey(), e.getValue().intValue()))
                .toList();

        GetTopMintedCurrenciesResponse.Builder responseBuilder = GetTopMintedCurrenciesResponse.newBuilder();
        topRecords.forEach(
                r -> responseBuilder.addRecords(
                            TotalCurrencyMintedRecord.newBuilder()
                                    .setCurrencyName(r.currencyName)
                                    .setAmount(r.amount)
                                    .build()));

        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }

    private record CurrencyRecord(String currencyName, int amount) {}
}
