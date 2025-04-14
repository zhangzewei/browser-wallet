// 消息传递相关常量
export const MESSAGE_PREFIX = '57block_wallet';

// 消息类型
export enum MessageType {
    REQUEST = 'REQUEST',
    RESPONSE = 'RESPONSE',
    ACCOUNT_MANAGEMENT = 'ACCOUNT_MANAGEMENT',
    NETWORK_MANAGEMENT = 'NETWORK_MANAGEMENT'
}

// 钱包信息
export const WALLET_INFO = {
    name: '57block Wallet',
    version: '1.0.0',
    description: 'A browser extension wallet for 57block'
}; 