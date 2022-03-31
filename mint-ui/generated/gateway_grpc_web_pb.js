/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./gateway_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.GatewayServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.GatewayServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.CreateCurrencyGatewayRequest,
 *   !proto.CreateCurrencyGatewayResponse>}
 */
const methodDescriptor_GatewayService_CreateCurrency = new grpc.web.MethodDescriptor(
  '/GatewayService/CreateCurrency',
  grpc.web.MethodType.UNARY,
  proto.CreateCurrencyGatewayRequest,
  proto.CreateCurrencyGatewayResponse,
  /**
   * @param {!proto.CreateCurrencyGatewayRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.CreateCurrencyGatewayResponse.deserializeBinary
);


/**
 * @param {!proto.CreateCurrencyGatewayRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.CreateCurrencyGatewayResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.CreateCurrencyGatewayResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GatewayServiceClient.prototype.createCurrency =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GatewayService/CreateCurrency',
      request,
      metadata || {},
      methodDescriptor_GatewayService_CreateCurrency,
      callback);
};


/**
 * @param {!proto.CreateCurrencyGatewayRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.CreateCurrencyGatewayResponse>}
 *     Promise that resolves to the response
 */
proto.GatewayServicePromiseClient.prototype.createCurrency =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GatewayService/CreateCurrency',
      request,
      metadata || {},
      methodDescriptor_GatewayService_CreateCurrency);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.MintGatewayRequest,
 *   !proto.MintGatewayResponse>}
 */
const methodDescriptor_GatewayService_Mint = new grpc.web.MethodDescriptor(
  '/GatewayService/Mint',
  grpc.web.MethodType.UNARY,
  proto.MintGatewayRequest,
  proto.MintGatewayResponse,
  /**
   * @param {!proto.MintGatewayRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.MintGatewayResponse.deserializeBinary
);


/**
 * @param {!proto.MintGatewayRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.MintGatewayResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.MintGatewayResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GatewayServiceClient.prototype.mint =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GatewayService/Mint',
      request,
      metadata || {},
      methodDescriptor_GatewayService_Mint,
      callback);
};


/**
 * @param {!proto.MintGatewayRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.MintGatewayResponse>}
 *     Promise that resolves to the response
 */
proto.GatewayServicePromiseClient.prototype.mint =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GatewayService/Mint',
      request,
      metadata || {},
      methodDescriptor_GatewayService_Mint);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.GetTopMintedCurrenciesGatewayRequest,
 *   !proto.GetTopMintedCurrenciesGatewayResponse>}
 */
const methodDescriptor_GatewayService_GetTopMintedCurrencies = new grpc.web.MethodDescriptor(
  '/GatewayService/GetTopMintedCurrencies',
  grpc.web.MethodType.UNARY,
  proto.GetTopMintedCurrenciesGatewayRequest,
  proto.GetTopMintedCurrenciesGatewayResponse,
  /**
   * @param {!proto.GetTopMintedCurrenciesGatewayRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.GetTopMintedCurrenciesGatewayResponse.deserializeBinary
);


/**
 * @param {!proto.GetTopMintedCurrenciesGatewayRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.GetTopMintedCurrenciesGatewayResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.GetTopMintedCurrenciesGatewayResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GatewayServiceClient.prototype.getTopMintedCurrencies =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GatewayService/GetTopMintedCurrencies',
      request,
      metadata || {},
      methodDescriptor_GatewayService_GetTopMintedCurrencies,
      callback);
};


/**
 * @param {!proto.GetTopMintedCurrenciesGatewayRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.GetTopMintedCurrenciesGatewayResponse>}
 *     Promise that resolves to the response
 */
proto.GatewayServicePromiseClient.prototype.getTopMintedCurrencies =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GatewayService/GetTopMintedCurrencies',
      request,
      metadata || {},
      methodDescriptor_GatewayService_GetTopMintedCurrencies);
};


module.exports = proto;

