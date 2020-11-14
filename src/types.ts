import { JsonRpcRequest } from 'rpc-json-utils';

export type JsonSchema = any;

export interface JsonRpcMethodSchema {
  name: string;
  description: string;
  params: JsonSchema;
  result: JsonSchema;
  userApproval?: boolean;
}
export interface JsonRpcSignerConfig {
  [method: string]: JsonRpcMethodSchema;
}

export abstract class IJsonRpcSigner {
  constructor(public config: JsonRpcSignerConfig) {}

  public abstract supportsMethod(request: JsonRpcRequest): boolean;

  public abstract requiresApproval(request: JsonRpcRequest): boolean;
}
