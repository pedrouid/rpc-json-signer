import { JsonRpcRequest } from 'rpc-json-utils';

import { JsonRpcSignerConfig, IJsonRpcSigner } from './types';

class JsonRpcSigner extends IJsonRpcSigner {
  constructor(public config: JsonRpcSignerConfig) {
    super(config);
    this.config = config;
  }

  public supportsMethod(request: JsonRpcRequest): boolean {
    return Object.keys(this.config).includes(request.method);
  }

  public requiresApproval(request: JsonRpcRequest): boolean {
    return !!this.config[request.method].userApproval;
  }
}

export default JsonRpcSigner;
