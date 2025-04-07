import { defineBackground } from 'wxt/sandbox';
import { MESSAGE_PREFIX, MessageType } from '../../constants';

// 处理 RPC 请求
async function handleRpcRequest(request: any) {
    try {
        // 根据请求的方法执行相应的操作
        switch (request.method) {
            case 'eth_accounts':
                return ['0x0000000000000000000000000000000000000000'];

            case 'eth_chainId':
                return '0x1'; // Ethereum Mainnet

            case 'net_version':
                return '1'; // Ethereum Mainnet

            case 'eth_requestAccounts':
                // 这里应该触发钱包 UI 来请求用户授权
                // 现在我们简单返回一个固定地址
                return ['0x0000000000000000000000000000000000000000'];

            default:
                throw new Error(`Method not supported: ${request.method}`);
        }
    } catch (error) {
        console.error('RPC request error:', error);
        throw error;
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
        });
    },
}); 