import { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Wallet, Send, Settings, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from 'react-router-dom';
import { useWallet } from "../../contexts/wallet";
import { shortenAddress } from '../../lib/utils';

interface Token {
    symbol: string;
    name: string;
    balance: string;
    price: string;
    change24h: number;
}

export default function Home() {
    const navigate = useNavigate();
    const { state } = useWallet();
    const { currentAccount } = state;

    const [isTokenListExpanded, setIsTokenListExpanded] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [tokens] = useState<Token[]>([
        {
            symbol: "ETH",
            name: "Ethereum",
            balance: "1.2345",
            price: "$2,345.67",
            change24h: 2.5
        },
        {
            symbol: "USDC",
            name: "USD Coin",
            balance: "1,234.56",
            price: "$1.00",
            change24h: 0.1
        },
        {
            symbol: "UNI",
            name: "Uniswap",
            balance: "100.00",
            price: "$7.89",
            change24h: -1.2
        }
    ]);

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="p-4 bg-white border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-blue-100">
                            <Wallet className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-medium">My Wallet: {currentAccount?.address ? shortenAddress(currentAccount.address) : ''}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
                        <Settings className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Total Balance */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-sm text-gray-500">Total Balance</div>
                        <div className="text-3xl font-bold mt-1">$3,456.78</div>
                        <div className="text-sm text-green-500 mt-1">+$123.45 (3.6%)</div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        className="h-20 flex flex-col gap-2"
                        onClick={() => navigate('/send')}
                    >
                        <Send className="h-4 w-4" />
                        <span className="text-sm">Send</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-20 flex flex-col gap-2"
                        onClick={() => navigate('/receive')}
                    >
                        <Wallet className="h-6 w-6" />
                        <span className="text-sm">Receive</span>
                    </Button>
                </div>

                {/* Token List */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">Tokens</CardTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsTokenListExpanded(!isTokenListExpanded)}
                        >
                            {isTokenListExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {isTokenListExpanded && (
                            <div className="space-y-4">
                                {tokens.map((token) => (
                                    <div
                                        key={token.symbol}
                                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                {token.symbol[0]}
                                            </div>
                                            <div>
                                                <div className="font-medium">{token.symbol}</div>
                                                <div className="text-sm text-gray-500">{token.name}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">{token.balance}</div>
                                            <div className="text-sm text-gray-500">{token.price}</div>
                                            <div className={`text-sm ${token.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {token.change24h >= 0 ? (
                                                    <ChevronUp className="inline-block h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="inline-block h-4 w-4" />
                                                )}
                                                {Math.abs(token.change24h)}%
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
                        <Button variant="ghost" size="sm">
                            View All
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-gray-500 text-center py-4">
                            No recent activity
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
    );
} 