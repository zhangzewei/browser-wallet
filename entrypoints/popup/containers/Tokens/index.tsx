import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddTokenDialog from "../../components/AddTokenDialog";
import { useToast } from "../../hooks/use-toast";

interface Token {
    address: string;
    symbol: string;
    decimals: number;
    name: string;
}

const defaultTokens: Token[] = [
    {
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        symbol: "WETH",
        decimals: 18,
        name: "Wrapped Ether",
    },
    {
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        symbol: "USDT",
        decimals: 6,
        name: "Tether USD",
    },
    {
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        symbol: "USDC",
        decimals: 6,
        name: "USD Coin",
    },
];

export default function Tokens() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [customTokens, setCustomTokens] = useState<Token[]>([]);

    const handleAddToken = (token: Token) => {
        // Check if token with same address already exists
        if (defaultTokens.some(t => t.address.toLowerCase() === token.address.toLowerCase()) ||
            customTokens.some(t => t.address.toLowerCase() === token.address.toLowerCase())) {
            toast({
                title: "Error",
                description: "Token with this address already exists",
                variant: "destructive",
            });
            return;
        }

        setCustomTokens([...customTokens, token]);
        toast({
            title: "Success",
            description: "Token added successfully",
        });
    };

    const handleDeleteToken = (address: string) => {
        setCustomTokens(customTokens.filter(t => t.address !== address));
        toast({
            title: "Success",
            description: "Token removed successfully",
        });
    };

    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

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
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
                            <Plus className="h-4 w-4" />
                            Add Token
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Default Tokens */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Default Tokens</h3>
                                <div className="space-y-2">
                                    {defaultTokens.map((token) => (
                                        <div
                                            key={token.address}
                                            className="flex items-center justify-between p-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="font-medium">{token.symbol}</div>
                                                <div className="text-sm text-gray-500">{token.name}</div>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {formatAddress(token.address)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Tokens */}
                            {customTokens.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Custom Tokens</h3>
                                    <div className="space-y-2">
                                        {customTokens.map((token) => (
                                            <div
                                                key={token.address}
                                                className="flex items-center justify-between p-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="font-medium">{token.symbol}</div>
                                                    <div className="text-sm text-gray-500">{token.name}</div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm text-gray-500">
                                                        {formatAddress(token.address)}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                                                        onClick={() => handleDeleteToken(token.address)}
                                                    >
                                                        <Trash2 className="h-3 w-3 text-red-500" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Add Token Dialog */}
            <AddTokenDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onAdd={handleAddToken}
            />
        </div>
    );
} 