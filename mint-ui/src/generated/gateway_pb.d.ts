import * as jspb from 'google-protobuf'



export class CreateCurrencyGatewayRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateCurrencyGatewayRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateCurrencyGatewayRequest): CreateCurrencyGatewayRequest.AsObject;
  static serializeBinaryToWriter(message: CreateCurrencyGatewayRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateCurrencyGatewayRequest;
  static deserializeBinaryFromReader(message: CreateCurrencyGatewayRequest, reader: jspb.BinaryReader): CreateCurrencyGatewayRequest;
}

export namespace CreateCurrencyGatewayRequest {
  export type AsObject = {
  }
}

export class CreateCurrencyGatewayResponse extends jspb.Message {
  getCurrencyname(): string;
  setCurrencyname(value: string): CreateCurrencyGatewayResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateCurrencyGatewayResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateCurrencyGatewayResponse): CreateCurrencyGatewayResponse.AsObject;
  static serializeBinaryToWriter(message: CreateCurrencyGatewayResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateCurrencyGatewayResponse;
  static deserializeBinaryFromReader(message: CreateCurrencyGatewayResponse, reader: jspb.BinaryReader): CreateCurrencyGatewayResponse;
}

export namespace CreateCurrencyGatewayResponse {
  export type AsObject = {
    currencyname: string,
  }
}

export class MintGatewayRequest extends jspb.Message {
  getCurrencyname(): string;
  setCurrencyname(value: string): MintGatewayRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MintGatewayRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MintGatewayRequest): MintGatewayRequest.AsObject;
  static serializeBinaryToWriter(message: MintGatewayRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MintGatewayRequest;
  static deserializeBinaryFromReader(message: MintGatewayRequest, reader: jspb.BinaryReader): MintGatewayRequest;
}

export namespace MintGatewayRequest {
  export type AsObject = {
    currencyname: string,
  }
}

export class MintGatewayResponse extends jspb.Message {
  getNewamount(): number;
  setNewamount(value: number): MintGatewayResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MintGatewayResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MintGatewayResponse): MintGatewayResponse.AsObject;
  static serializeBinaryToWriter(message: MintGatewayResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MintGatewayResponse;
  static deserializeBinaryFromReader(message: MintGatewayResponse, reader: jspb.BinaryReader): MintGatewayResponse;
}

export namespace MintGatewayResponse {
  export type AsObject = {
    newamount: number,
  }
}

export class GetTopMintedCurrenciesGatewayRequest extends jspb.Message {
  getMaxnumberofcurrencies(): number;
  setMaxnumberofcurrencies(value: number): GetTopMintedCurrenciesGatewayRequest;

  getPrefix(): string;
  setPrefix(value: string): GetTopMintedCurrenciesGatewayRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTopMintedCurrenciesGatewayRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTopMintedCurrenciesGatewayRequest): GetTopMintedCurrenciesGatewayRequest.AsObject;
  static serializeBinaryToWriter(message: GetTopMintedCurrenciesGatewayRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTopMintedCurrenciesGatewayRequest;
  static deserializeBinaryFromReader(message: GetTopMintedCurrenciesGatewayRequest, reader: jspb.BinaryReader): GetTopMintedCurrenciesGatewayRequest;
}

export namespace GetTopMintedCurrenciesGatewayRequest {
  export type AsObject = {
    maxnumberofcurrencies: number,
    prefix: string,
  }
}

export class TotalCurrencyMintedGatewayRecord extends jspb.Message {
  getCurrencyname(): string;
  setCurrencyname(value: string): TotalCurrencyMintedGatewayRecord;

  getAmount(): number;
  setAmount(value: number): TotalCurrencyMintedGatewayRecord;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TotalCurrencyMintedGatewayRecord.AsObject;
  static toObject(includeInstance: boolean, msg: TotalCurrencyMintedGatewayRecord): TotalCurrencyMintedGatewayRecord.AsObject;
  static serializeBinaryToWriter(message: TotalCurrencyMintedGatewayRecord, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TotalCurrencyMintedGatewayRecord;
  static deserializeBinaryFromReader(message: TotalCurrencyMintedGatewayRecord, reader: jspb.BinaryReader): TotalCurrencyMintedGatewayRecord;
}

export namespace TotalCurrencyMintedGatewayRecord {
  export type AsObject = {
    currencyname: string,
    amount: number,
  }
}

export class GetTopMintedCurrenciesGatewayResponse extends jspb.Message {
  getRecordsList(): Array<TotalCurrencyMintedGatewayRecord>;
  setRecordsList(value: Array<TotalCurrencyMintedGatewayRecord>): GetTopMintedCurrenciesGatewayResponse;
  clearRecordsList(): GetTopMintedCurrenciesGatewayResponse;
  addRecords(value?: TotalCurrencyMintedGatewayRecord, index?: number): TotalCurrencyMintedGatewayRecord;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTopMintedCurrenciesGatewayResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTopMintedCurrenciesGatewayResponse): GetTopMintedCurrenciesGatewayResponse.AsObject;
  static serializeBinaryToWriter(message: GetTopMintedCurrenciesGatewayResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTopMintedCurrenciesGatewayResponse;
  static deserializeBinaryFromReader(message: GetTopMintedCurrenciesGatewayResponse, reader: jspb.BinaryReader): GetTopMintedCurrenciesGatewayResponse;
}

export namespace GetTopMintedCurrenciesGatewayResponse {
  export type AsObject = {
    recordsList: Array<TotalCurrencyMintedGatewayRecord.AsObject>,
  }
}

