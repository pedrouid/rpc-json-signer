import {
  IJsonRpcSigner,
  JsonRpcSigner,
  JsonRpcSignerConfig,
  JsonSchema,
} from '../src';

const ETHEREUM_TX_JSONRPC_SCHEMA: JsonSchema = {
  type: 'object',
  properties: {
    from: { type: 'string', required: true },
    to: { type: 'string' },
    gas: { type: 'string' },
    gasPrice: { type: 'string' },
    value: { type: 'string' },
    data: { type: 'string' },
    nonce: { type: 'string' },
  },
};

const ETHEREUM_SIGNER_JSONRPC_CONFIG: JsonRpcSignerConfig = {
  eth_sendTransaction: {
    name: 'eth_sendTransaction',
    description: 'Creates, signs, and sends a new transaction to the network',
    params: {
      type: 'array',
      items: ETHEREUM_TX_JSONRPC_SCHEMA,
    },
    result: {
      type: 'string',
    },
    userApproval: true,
  },
};

const TEST_JSON_RPC_REQUEST = {
  eth_sendTransaction: {
    id: 1,
    jsonrpc: '2.0',
    method: 'eth_sendTransaction',
    params: [
      {
        data:
          '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
        from: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
        gas: '0x76c0',
        gasPrice: '0x9184e72a000',
        to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
        value: '0x9184e72a',
      },
    ],
  },
  invalid_method: {
    id: 1,
    jsonrpc: '2.0',
    method: 'invalid_method',
    params: [],
  },
};

describe('JsonRpcSigner', () => {
  let ethereumSigner: IJsonRpcSigner;
  beforeAll(() => {
    ethereumSigner = new JsonRpcSigner(ETHEREUM_SIGNER_JSONRPC_CONFIG);
  });
  it('init', async () => {
    expect(ethereumSigner).toBeTruthy();
  });
  it('supportsMethod', async () => {
    expect(
      ethereumSigner.supportsMethod(TEST_JSON_RPC_REQUEST.eth_sendTransaction)
    ).toBeTruthy();
    expect(
      ethereumSigner.supportsMethod(TEST_JSON_RPC_REQUEST.invalid_method)
    ).toBeFalsy();
  });
  it('requiresApproval', async () => {
    expect(
      ethereumSigner.requiresApproval(TEST_JSON_RPC_REQUEST.eth_sendTransaction)
    ).toBeTruthy();
    expect(() =>
      ethereumSigner.requiresApproval(TEST_JSON_RPC_REQUEST.invalid_method)
    ).toThrow(`JSON-RPC method not supported: invalid_method`);
  });
  it('validateRequest', async () => {
    expect(
      ethereumSigner.validateRequest(TEST_JSON_RPC_REQUEST.eth_sendTransaction)
    ).toBeTruthy();
    expect(() =>
      ethereumSigner.validateRequest(TEST_JSON_RPC_REQUEST.invalid_method)
    ).toThrow(`JSON-RPC method not supported: invalid_method`);
  });
});
