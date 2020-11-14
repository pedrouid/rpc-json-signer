import * as jsonschema from 'jsonschema';
import { JsonRpcRequest } from 'rpc-json-utils';

import {
  IJsonRpcSigner,
  JsonRpcSignerConfig,
  JsonRpcMethodConfig,
} from './types';

class JsonRpcSigner extends IJsonRpcSigner {
  constructor(public config: JsonRpcSignerConfig) {
    super(config);
    this.config = config;
  }

  public supportsMethod(request: JsonRpcRequest): boolean {
    return Object.keys(this.config).includes(request.method);
  }

  public requiresApproval(request: JsonRpcRequest): boolean {
    const jsonrpc = this.getJsonRpcConfig(request.method);
    return !!jsonrpc.userApproval;
  }

  public validateRequest(request: JsonRpcRequest): boolean {
    const jsonrpc = this.getJsonRpcConfig(request.method);
    const result = jsonschema.validate(request.params, jsonrpc.params);
    return result.valid;
  }

  // -- Private ----------------------------------------------- //

  private getJsonRpcConfig(method: string): JsonRpcMethodConfig {
    const jsonrpc = this.config[method];
    if (typeof jsonrpc === 'undefined') {
      throw new Error(`JSON-RPC method not supported: ${method}`);
    }
    return jsonrpc;
  }
}

export default JsonRpcSigner;
