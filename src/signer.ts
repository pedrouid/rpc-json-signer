import { JsonRpcProvider } from 'rpc-json-provider';

import { IJsonRpcSigner } from './types';

export class JsonRpcSigner extends JsonRpcProvider implements IJsonRpcSigner {
  constructor(public url: string) {
    super(url);
  }

  public async getAccounts(): Promise<string[]> {
    return [];
  }
}
