import { defineContentScript } from 'wxt/sandbox';
import { v4 as uuidv4 } from 'uuid';
import Logo from '../../public/assets/icon-48.png';

declare global {
    interface Window {
        ethereum?: any;
    }
}

interface EIP1193Provider {
    request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    on: (event: string, listener: (...args: any[]) => void) => void;
    removeListener: (event: string, listener: (...args: any[]) => void) => void;
}

class BrowserWalletProvider implements EIP1193Provider {
    private _isConnected = false;
    private _accounts: string[] = [];
    private _eventListeners: { [key: string]: ((...args: any[]) => void)[] } = {};

    constructor() {
        // Initialize event listeners storage
        this._eventListeners = {
            'accountsChanged': [],
            'chainChanged': [],
            'connect': [],
            'disconnect': [],
            'message': []
        };

        // Listen for messages from background script
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type === 'wallet_event') {
                this.emit(message.event, ...message.args);
            }
        });
    }

    async request({ method, params = [] }: { method: string; params?: unknown[] }): Promise<unknown> {
        // Send message to background script
        const response = await chrome.runtime.sendMessage({
            type: 'wallet_request',
            method,
            params
        });

        if (response.error) {
            throw new Error(response.error);
        }

        return response.result;
    }

    on(event: string, listener: (...args: any[]) => void): void {
        if (!this._eventListeners[event]) {
            this._eventListeners[event] = [];
        }
        this._eventListeners[event].push(listener);
    }

    removeListener(event: string, listener: (...args: any[]) => void): void {
        if (this._eventListeners[event]) {
            this._eventListeners[event] = this._eventListeners[event].filter(l => l !== listener);
        }
    }

    // Method to emit events (called internally)
    private emit(event: string, ...args: any[]): void {
        if (this._eventListeners[event]) {
            this._eventListeners[event].forEach(listener => listener(...args));
        }
    }
}

export default defineContentScript({
    matches: ['<all_urls>'],
    runAt: 'document_start',
    main() {
        // Create provider instance
        const provider = new BrowserWalletProvider();

        // Announce provider following EIP-6963
        const announceProvider = () => {
            const info = {
                uuid: uuidv4(),
                name: "Browser Wallet",
                icon: Logo,
                rdns: "com.browserwallet"
            };

            window.dispatchEvent(
                new CustomEvent("eip6963:announceProvider", {
                    detail: Object.freeze({
                        info,
                        provider
                    })
                })
            );
        };

        // Listen for provider requests
        window.addEventListener("eip6963:requestProvider", () => {
            announceProvider();
        });

        // Initial announcement
        announceProvider();

        // Also inject as window.ethereum for backwards compatibility
        if (!window.ethereum) {
            Object.defineProperty(window, 'ethereum', {
                value: provider,
                writable: false,
                configurable: true
            });
        }

        // Return cleanup function
        return () => {
            // Remove event listeners and cleanup when content script is unloaded
            window.removeEventListener("eip6963:requestProvider", announceProvider);
        };
    },
}); 