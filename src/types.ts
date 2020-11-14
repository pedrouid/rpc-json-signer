import * as jsonschema from 'jsonschema';

import { JsonRpcRequest } from 'rpc-json-utils';

export type JsonSchema = jsonschema.Schema;
export interface JsonRpcMethodConfig {
  name: string;
  description: string;
  params: JsonSchema;
  result: JsonSchema;
  userApproval?: boolean;
}
export interface JsonRpcSignerConfig {
  [method: string]: JsonRpcMethodConfig;
}

export abstract class IJsonRpcSigner {
  constructor(public config: JsonRpcSignerConfig) {}

  public abstract supportsMethod(request: JsonRpcRequest): boolean;

  public abstract requiresApproval(request: JsonRpcRequest): boolean;

  public abstract validateRequest(request: JsonRpcRequest): boolean;
}
