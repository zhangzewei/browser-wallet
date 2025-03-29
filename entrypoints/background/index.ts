import { defineBackground } from 'wxt/sandbox';

interface WalletState {
    isConnected: boolean;
    accounts: string[];
    chainId: string;
}

export default defineBackground({
    main() {
        let state: WalletState = {
            isConnected: false,
            accounts: [],
            chainId: '0x1' // Default to Ethereum mainnet
        };

        // Handle messages from content script
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type !== 'wallet_request') {
                return;
            }

            handleWalletRequest(message, sender, sendResponse, state);
            return true; // Keep the message channel open for async response
        });
    }
});

async function handleWalletRequest(
    message: { method: string; params: any[] },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void,
    state: WalletState
) {
    try {
        switch (message.method) {
            case 'eth_requestAccounts':
            case 'eth_accounts':
                if (!state.isConnected) {
                    // Show popup for connection approval
                    const popup = await chrome.windows.create({
                        url: 'popup.html#/connect',
                        type: 'popup',
                        width: 360,
                        height: 600
                    });

                    // Wait for user approval
                    // This is simplified - you'll need to implement proper communication
                    // between popup and background
                    state.isConnected = true;
                    state.accounts = ['0x1234567890123456789012345678901234567890']; // Example account
                }
                sendResponse({ result: state.accounts });
                break;

            case 'eth_chainId':
                sendResponse({ result: state.chainId });
                break;

            case 'eth_sendTransaction':
                // Show popup for transaction approval
                const txPopup = await chrome.windows.create({
                    url: `popup.html#/send?tx=${encodeURIComponent(JSON.stringify(message.params[0]))}`,
                    type: 'popup',
                    width: 360,
                    height: 600
                });
                // The actual transaction handling will be done in the popup
                // This is just a placeholder response
                sendResponse({ result: '0x...' }); // Transaction hash
                break;

            default:
                sendResponse({ error: `Method ${message.method} not supported` });
        }
    } catch (error) {
        sendResponse({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
} 