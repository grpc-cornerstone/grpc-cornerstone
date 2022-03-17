package xyz.cornerstone.serviceA;

import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.MoreExecutors;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.stub.StreamObserver;
import xyz.cornerstone.serviceB.CallBRequest;
import xyz.cornerstone.serviceB.CallBResponse;
import xyz.cornerstone.serviceB.ServiceBGrpc;
import xyz.cornerstone.serviceC.CallCRequest;
import xyz.cornerstone.serviceC.ServiceCGrpc;

/**
 * Implementation of serviceA
 * Returns a dummy response and calls serviceB
 */
final class ServiceA extends ServiceAGrpc.ServiceAImplBase {

    private final ServiceBGrpc.ServiceBFutureStub client;

    ServiceA() {
        ManagedChannel channel = ManagedChannelBuilder
                .forAddress("localhost", 8091)
                .usePlaintext()
                .build();

        client = ServiceBGrpc.newFutureStub(channel);
    }

    @SuppressWarnings("UnstableApiUsage")
    @Override
    public void callA(CallARequest request, StreamObserver<CallAResponse> responseObserver) {
        String currentPayload = request.getRequestAPayload();
        Futures.transform(
                client.callB(CallBRequest.newBuilder().setRequestBPayload(currentPayload).build()),
                response -> {
                    responseObserver.onNext(CallAResponse.newBuilder().setResponseAPayload(response + "A").build());
                    responseObserver.onCompleted();
                    return null;
                },
                MoreExecutors.directExecutor()
        );
    }
}
