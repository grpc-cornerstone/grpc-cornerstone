package xyz.cornerstone.serviceB;

import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.MoreExecutors;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.stub.StreamObserver;
import xyz.cornerstone.serviceC.CallCRequest;
import xyz.cornerstone.serviceC.ServiceCGrpc;

/**
 * Implementation of serviceB
 * Returns a dummy response and calls serviceC
 */
final class ServiceB extends ServiceBGrpc.ServiceBImplBase {

    private final ServiceCGrpc.ServiceCFutureStub client;

    ServiceB() {
        ManagedChannel channel = ManagedChannelBuilder
                .forAddress("localhost", 8092)
                .usePlaintext()
                .build();

        client = ServiceCGrpc.newFutureStub(channel);
    }

    @SuppressWarnings("UnstableApiUsage")
    @Override
    public void callB(CallBRequest request, StreamObserver<CallBResponse> responseObserver) {
        String currentPayload = request.getRequestBPayload();
        Futures.transform(
                client.callC(CallCRequest.newBuilder().setRequestCPayload(currentPayload).build()),
                response -> {
                    responseObserver.onNext(CallBResponse.newBuilder().setResponseBPayload(response + "B").build());
                    responseObserver.onCompleted();
                    return null;
                },
                MoreExecutors.directExecutor()
        );
    }
}
