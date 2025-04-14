export const MESSAGE_PREFIX = '57block_wallet';

export enum MessageType {
    RPC_REQUEST = 'RPC_REQUEST',
    RPC_RESPONSE = 'RPC_RESPONSE',
    ACCOUNT_MANAGEMENT = 'ACCOUNT_MANAGEMENT'
}

export const WALLET_INFO = {
    name: '57block Wallet',
    version: '1.0.0',
    description: 'A browser extension wallet for 57block'
}; 