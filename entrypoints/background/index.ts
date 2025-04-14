import { defineBackground } from 'wxt/sandbox';
import { MESSAGE_PREFIX, MessageType } from '../../constants';
import AccountService from '../../src/services/accountService';
import NetworkService from '../../src/services/networkService';

// Initialize services
const accountService = AccountService.getInstance();
const networkService = NetworkService.getInstance();

// 处理 RPC 请求
async function handleRpcRequest(request: any) {
    try {
        // 根据请求的方法执行相应的操作
        switch (request.method) {
            case 'eth_accounts':
            case 'eth_requestAccounts':
                // 返回当前选中的账户地址
                const currentAccount = accountService.getCurrentAccount();
                if (!currentAccount) {
                    throw new Error('No account selected');
                }
                return [currentAccount.address];

            case 'eth_chainId':
                // 返回当前网络的 chainId
                const currentNetwork = networkService.getCurrentNetwork();
                if (!currentNetwork) {
                    throw new Error('No current network found');
                }
                return `0x${currentNetwork.id.toString(16)}`;

            case 'net_version':
                // 返回当前网络的 chainId
                const network = networkService.getCurrentNetwork();
                if (!network) {
                    throw new Error('No current network found');
                }
                return network.id.toString();

            case 'eth_getBalance':
                // TODO: 实现获取余额的逻辑
                return '0x0';

            case 'eth_sendTransaction':
                // TODO: 实现发送交易的逻辑
                throw new Error('Transaction sending not implemented yet');

            case 'eth_sign':
                // TODO: 实现签名逻辑
                throw new Error('Signing not implemented yet');

            case 'personal_sign':
                // TODO: 实现 personal_sign 逻辑
                throw new Error('Personal signing not implemented yet');

            default:
                throw new Error(`Method not supported: ${request.method}`);
        }
    } catch (error) {
        console.error('RPC request error:', error);
        throw error;
    }
}

// 处理账户管理请求
async function handleAccountManagement(action: string, payload: any) {
    try {
        switch (action) {
            case 'addAccount':
                await accountService.addAccount(payload);
                return { success: true };
            case 'removeAccount':
                await accountService.removeAccount(payload.address);
                return { success: true };
            case 'updateAccount':
                await accountService.updateAccount(payload);
                return { success: true };
            case 'getAccounts':
                return { success: true, data: accountService.getAccounts() };
            case 'getAccount':
                const account = accountService.getAccount(payload.address);
                return { success: true, data: account };
            default:
                return { success: false, error: 'Unknown action' };
        }
    } catch (error) {
        console.error('Account management error:', error);
        return { success: false, error: (error as Error).message };
    }
}

// 处理网络管理请求
async function handleNetworkManagement(action: string, payload: any) {
    try {
        switch (action) {
            case 'addNetwork':
                await networkService.addNetwork(payload);
                return { success: true };
            case 'removeNetwork':
                await networkService.removeNetwork(payload.chainId);
                return { success: true };
            case 'updateNetwork':
                await networkService.updateNetwork(payload);
                return { success: true };
            case 'getNetworks':
                return { success: true, data: networkService.getNetworks() };
            case 'getNetwork':
                const network = networkService.getNetwork(payload.chainId);
                return { success: true, data: network };
            case 'getCurrentNetwork':
                const currentNetwork = networkService.getCurrentNetwork();
                return { success: true, data: currentNetwork };
            case 'setCurrentNetwork':
                await networkService.setCurrentNetwork(payload.chainId);
                return { success: true };
            default:
                return { success: false, error: 'Unknown action' };
        }
    } catch (error) {
        console.error('Network management error:', error);
        return { success: false, error: (error as Error).message };
    }
}

export default defineBackground({
    main() {
        // 监听来自 content script 的消息
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            // 检查消息是否来自我们的 content script
            if (
                message &&
                typeof message === 'object' &&
                message.type === `${MESSAGE_PREFIX}${MessageType.REQUEST}`
            ) {
                const request = message.payload;

                // 处理 RPC 请求
                handleRpcRequest(request)
                    .then(result => {
                        // 发送成功响应
                        sendResponse({
                            id: request.id,
                            jsonrpc: request.jsonrpc,
                            result
                        });
                    })
                    .catch(error => {
                        // 发送错误响应
                        sendResponse({
                            id: request.id,
                            jsonrpc: request.jsonrpc,
                            error: {
                                code: -32603, // Internal error
                                message: error.message || 'Internal error'
                            }
                        });
                    });

                // 返回 true 表示我们将异步发送响应
                return true;
            }

            // 处理账户管理请求
            if (message.type === MessageType.ACCOUNT_MANAGEMENT) {
                const { action, payload } = message;
                handleAccountManagement(action, payload)
                    .then(response => sendResponse(response));
                return true; // Keep the message channel open for async response
            }

            // 处理网络管理请求
            if (message.type === MessageType.NETWORK_MANAGEMENT) {
                const { action, payload } = message;
                handleNetworkManagement(action, payload)
                    .then(response => sendResponse(response));
                return true; // Keep the message channel open for async response
            }
        });
    },
}); 