/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as gateway_pb from './gateway_pb';


export class GatewayServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoCreateCurrency = new grpcWeb.MethodDescriptor(
    '/GatewayService/CreateCurrency',
    grpcWeb.MethodType.UNARY,
    gateway_pb.CreateCurrencyGatewayRequest,
    gateway_pb.CreateCurrencyGatewayResponse,
    (request: gateway_pb.CreateCurrencyGatewayRequest) => {
      return request.serializeBinary();
    },
    gateway_pb.CreateCurrencyGatewayResponse.deserializeBinary
  );

  createCurrency(
    request: gateway_pb.CreateCurrencyGatewayRequest,
    metadata: grpcWeb.Metadata | null): Promise<gateway_pb.CreateCurrencyGatewayResponse>;

  createCurrency(
    request: gateway_pb.CreateCurrencyGatewayRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: gateway_pb.CreateCurrencyGatewayResponse) => void): grpcWeb.ClientReadableStream<gateway_pb.CreateCurrencyGatewayResponse>;

  createCurrency(
    request: gateway_pb.CreateCurrencyGatewayRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: gateway_pb.CreateCurrencyGatewayResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/GatewayService/CreateCurrency',
        request,
        metadata || {},
        this.methodInfoCreateCurrency,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/GatewayService/CreateCurrency',
    request,
    metadata || {},
    this.methodInfoCreateCurrency);
  }

  methodInfoMint = new grpcWeb.MethodDescriptor(
    '/GatewayService/Mint',
    grpcWeb.MethodType.UNARY,
    gateway_pb.MintGatewayRequest,
    gateway_pb.MintGatewayResponse,
    (request: gateway_pb.MintGatewayRequest) => {
      return request.serializeBinary();
    },
    gateway_pb.MintGatewayResponse.deserializeBinary
  );

  mint(
    request: gateway_pb.MintGatewayRequest,
    metadata: grpcWeb.Metadata | null): Promise<gateway_pb.MintGatewayResponse>;

  mint(
    request: gateway_pb.MintGatewayRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: gateway_pb.MintGatewayResponse) => void): grpcWeb.ClientReadableStream<gateway_pb.MintGatewayResponse>;

  mint(
    request: gateway_pb.MintGatewayRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: gateway_pb.MintGatewayResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/GatewayService/Mint',
        request,
        metadata || {},
        this.methodInfoMint,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/GatewayService/Mint',
    request,
    metadata || {},
    this.methodInfoMint);
  }

  methodInfoGetTopMintedCurrencies = new grpcWeb.MethodDescriptor(
    '/GatewayService/GetTopMintedCurrencies',
    grpcWeb.MethodType.UNARY,
    gateway_pb.GetTopMintedCurrenciesGatewayRequest,
    gateway_pb.GetTopMintedCurrenciesGatewayResponse,
    (request: gateway_pb.GetTopMintedCurrenciesGatewayRequest) => {
      return request.serializeBinary();
    },
    gateway_pb.GetTopMintedCurrenciesGatewayResponse.deserializeBinary
  );

  getTopMintedCurrencies(
    request: gateway_pb.GetTopMintedCurrenciesGatewayRequest,
    metadata: grpcWeb.Metadata | null): Promise<gateway_pb.GetTopMintedCurrenciesGatewayResponse>;

  getTopMintedCurrencies(
    request: gateway_pb.GetTopMintedCurrenciesGatewayRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: gateway_pb.GetTopMintedCurrenciesGatewayResponse) => void): grpcWeb.ClientReadableStream<gateway_pb.GetTopMintedCurrenciesGatewayResponse>;

  getTopMintedCurrencies(
    request: gateway_pb.GetTopMintedCurrenciesGatewayRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: gateway_pb.GetTopMintedCurrenciesGatewayResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/GatewayService/GetTopMintedCurrencies',
        request,
        metadata || {},
        this.methodInfoGetTopMintedCurrencies,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/GatewayService/GetTopMintedCurrencies',
    request,
    metadata || {},
    this.methodInfoGetTopMintedCurrencies);
  }

}

