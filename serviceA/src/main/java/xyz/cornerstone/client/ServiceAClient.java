package xyz.cornerstone.client;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.stub.ClientCallStreamObserver;
import io.grpc.stub.ClientResponseObserver;
import xyz.cornerstone.serviceA.CallARequest;
import xyz.cornerstone.serviceA.CallAResponse;
import xyz.cornerstone.serviceA.ServiceAGrpc;
import xyz.cornerstone.serviceA.ServiceAGrpc.ServiceAStub;

import java.util.concurrent.atomic.AtomicReference;

public class ServiceAClient {

    public static void main(String ... args) throws InterruptedException {

        ManagedChannel channel = ManagedChannelBuilder
                .forAddress("localhost", 8090)
                .usePlaintext()
                .build();
        ServiceAStub client = ServiceAGrpc.newStub(channel);

        int max = 10;
        for (int i = 0; i < max; i++) {
            AtomicReference<ClientCallStreamObserver> ref = new AtomicReference<>();
            client.callA(CallARequest.newBuilder().setRequestAPayload("Payload " + i).build(),
                            new ClientResponseObserver<CallARequest, CallAResponse>() {
                                @Override
                                public void beforeStart(ClientCallStreamObserver requestStream) {
                                    ref.set(requestStream);
                                }

                                @Override
                                public void onNext(CallAResponse response) {
                                    System.out.printf("Response %s%n", response);
                                }

                                @Override
                                public void onError(Throwable t) {
                                    t.printStackTrace();
                                }

                                @Override
                                public void onCompleted() {

                                }
                            }
                    );

            final boolean cancel = i == max - 1;
            if (cancel) {
                Thread.sleep(500);
                ref.get().cancel("Client-side cancellation", null);
            }

            Thread.sleep(1100L);
        }
    }
}
