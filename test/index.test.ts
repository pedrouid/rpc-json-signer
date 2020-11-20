import { formatJsonRpcRequest } from 'rpc-json-utils';

import { JsonRpcSigner } from '../src';

describe('rpc-json-signer', () => {
  // ---------- Signer ----------------------------------------------- //

  it('init', async () => {
    const provider = new JsonRpcSigner('https://api.mycryptoapi.com/eth');
    const result = await provider.request(
      formatJsonRpcRequest('eth_chainId', [])
    );
    expect(provider).toBeTruthy();
    expect(result).toEqual('0x1');
  });
});
