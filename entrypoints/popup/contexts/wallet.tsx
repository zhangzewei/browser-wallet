// 在这个文件中，我需要创建一个context，用于管理钱包的所有信息，包括账户、网络、钱包客户端、公链客户端，并且我需要使用该context与popup页面进行通信

import { createContext, useContext, useEffect, useState } from "react";
import { sendMessageFromPopup } from "../lib/utils";
import { MessageType } from "../../../constants";
import WalletController from "src/services/walletController";

interface WalletState {
    accounts: any[];
    currentAccount: any | null;
    networks: any[];
    currentNetwork: any | null;
    isConnected: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: WalletState = {
    accounts: [],
    currentAccount: null,
    networks: [],
    currentNetwork: null,
    isConnected: false,
    isLoading: true,
    error: null,
};

const walletControllerProxy = new Proxy(
    {},
    {
        get(_, prop: keyof WalletController) {
            return function (...args: unknown[]) {
                return new Promise((resolve, reject) => {
                    console.log('sendMessageFromPopup', prop, args);
                    sendMessageFromPopup(
                        {
                            type: MessageType.UI_REQUEST,
                            payload: {
                                method: prop,
                                params: args,
                            },
                        },
                        (response) => {
                            if (response.success) {
                                resolve(response.data);
                            } else {
                                reject(new Error(response.error));
                            }
                        }
                    );
                });
            };
        },
    }
) as WalletController;

const WalletContext = createContext<{
    wallet: WalletController;
    state: WalletState;
    refresh: () => Promise<void>;
} | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<WalletState>(initialState);

    const refresh = async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));
            const [accounts, currentAccount, networks, currentNetwork] = await Promise.all([
                walletControllerProxy.getAccounts(),
                walletControllerProxy.getCurrentAccount(),
                walletControllerProxy.getNetworks(),
                walletControllerProxy.getCurrentNetwork(),
            ]);
            setState({
                accounts,
                currentAccount,
                networks,
                currentNetwork,
                isConnected: !!currentAccount,
                isLoading: false,
                error: null,
            });
        } catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to refresh wallet state',
            }));
        }
    };

    // 初始化时刷新状态
    useEffect(() => {
        refresh();
    }, []);

    // 监听账户变化
    useEffect(() => {
        const handleAccountChange = async () => {
            const [accounts, currentAccount] = await Promise.all([
                walletControllerProxy.getAccounts(),
                walletControllerProxy.getCurrentAccount(),
            ]);
            setState(prev => ({
                ...prev,
                accounts,
                currentAccount,
                isConnected: !!currentAccount,
            }));
        };

        chrome.runtime.onMessage.addListener((message) => {
            if (message.type === MessageType.ACCOUNT_MANAGEMENT) {
                handleAccountChange();
            }
        });

        return () => {
            chrome.runtime.onMessage.removeListener(handleAccountChange);
        };
    }, []);

    // 监听网络变化
    useEffect(() => {
        const handleNetworkChange = async () => {
            const [networks, currentNetwork] = await Promise.all([
                walletControllerProxy.getNetworks(),
                walletControllerProxy.getCurrentNetwork(),
            ]);
            setState(prev => ({
                ...prev,
                networks,
                currentNetwork,
            }));
        };

        chrome.runtime.onMessage.addListener((message) => {
            if (message.type === MessageType.NETWORK_MANAGEMENT) {
                handleNetworkChange();
            }
        });

        return () => {
            chrome.runtime.onMessage.removeListener(handleNetworkChange);
        };
    }, []);

    return (
        <WalletContext.Provider value={{ wallet: walletControllerProxy, state, refresh }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};