import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { ArrowLeft, Plus, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Token {
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    chainId: number;
}

export default function Tokens() {
    const navigate = useNavigate();
    const tokens: Token[] = [
        {
            symbol: "ETH",
            name: "Ethereum",
            address: "0x0000000000000000000000000000000000000000",
            decimals: 18,
            chainId: 1
        },
        {
            symbol: "USDC",
            name: "USD Coin",
            address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            decimals: 6,
            chainId: 1
        }
    ];

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="p-4 bg-white border-b">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <span className="font-medium">Tokens</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">Supported Tokens</CardTitle>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Token
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {tokens.map((token) => (
                                <div
                                    key={token.address}
                                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <Coins className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{token.symbol}</div>
                                            <div className="text-sm text-gray-500">{token.name}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {token.decimals} decimals
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 