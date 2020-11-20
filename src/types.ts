import { IJsonRpcProvider } from 'rpc-json-utils';

export abstract class IJsonRpcSigner extends IJsonRpcProvider {
  public abstract getAccounts(): Promise<string[]>;
}
