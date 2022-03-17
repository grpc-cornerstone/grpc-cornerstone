package xyz.cornerstone.serviceC;

import io.grpc.stub.StreamObserver;

/**
 * Implementation of serviceC.
 * Returns a dummy response
 */
final class ServiceC extends ServiceCGrpc.ServiceCImplBase {

    @Override
    public void callC(CallCRequest request, StreamObserver<CallCResponse> responseObserver) {
        responseObserver.onNext(CallCResponse.newBuilder().setResponseCPayload(request.getRequestCPayload() + "C").build());
        responseObserver.onCompleted();
    }
}
