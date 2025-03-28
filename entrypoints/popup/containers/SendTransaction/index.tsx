import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useToast } from "../../hooks/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";

interface Token {
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    balance: string;
    icon?: string;
}

const defaultTokens: Token[] = [
    {
        symbol: "ETH",
        name: "Ethereum",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        balance: "1.2345",
        icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png"
    },
    {
        symbol: "USDC",
        name: "USD Coin",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        decimals: 6,
        balance: "1234.56",
        icon: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png"
    },
    {
        symbol: "UNI",
        name: "Uniswap",
        address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        decimals: 18,
        balance: "100.00",
        icon: "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png"
    }
];

export default function SendTransaction() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [selectedToken, setSelectedToken] = useState<Token>(defaultTokens[0]);
    const [formData, setFormData] = useState({
        to: "",
        amount: "",
        gasLimit: "",
        maxFeePerGas: "",
        maxPriorityFeePerGas: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate address
        if (!formData.to.trim()) {
            toast({
                title: "Error",
                description: "Please enter recipient address",
                variant: "destructive",
            });
            return;
        }
        if (!/^0x[a-fA-F0-9]{40}$/.test(formData.to)) {
            toast({
                title: "Error",
                description: "Please enter a valid Ethereum address",
                variant: "destructive",
            });
            return;
        }

        // Validate amount
        if (!formData.amount.trim()) {
            toast({
                title: "Error",
                description: "Please enter amount",
                variant: "destructive",
            });
            return;
        }
        const amount = parseFloat(formData.amount);
        if (isNaN(amount) || amount <= 0) {
            toast({
                title: "Error",
                description: "Please enter a valid amount",
                variant: "destructive",
            });
            return;
        }

        // Validate balance
        const balance = parseFloat(selectedToken.balance);
        if (amount > balance) {
            toast({
                title: "Error",
                description: `Insufficient ${selectedToken.symbol} balance`,
                variant: "destructive",
            });
            return;
        }

        // TODO: Implement actual transaction sending logic
        console.log("Sending transaction:", {
            ...formData,
            token: selectedToken,
        });
    };

    const handleTokenChange = (value: string) => {
        const token = defaultTokens.find(t => t.symbol === value);
        if (token) {
            setSelectedToken(token);
            // Reset amount when token changes
            setFormData(prev => ({ ...prev, amount: "" }));
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="p-4 bg-white border-b">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <span className="font-medium">Send Transaction</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4">
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select Token</Label>
                                <Select
                                    value={selectedToken.symbol}
                                    onValueChange={handleTokenChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <div className="flex items-center gap-2">
                                            {selectedToken.icon && (
                                                <img
                                                    src={selectedToken.icon}
                                                    alt={selectedToken.symbol}
                                                    className="w-5 h-5 rounded-full"
                                                />
                                            )}
                                            <span>{selectedToken.symbol}</span>
                                            <span className="text-sm text-gray-500">
                                                (Balance: {selectedToken.balance})
                                            </span>
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {defaultTokens.map((token) => (
                                            <SelectItem
                                                key={token.symbol}
                                                value={token.symbol}
                                            >
                                                <div className="flex items-center justify-between w-full">
                                                    <div className="flex items-center gap-2">
                                                        {token.icon && (
                                                            <img
                                                                src={token.icon}
                                                                alt={token.symbol}
                                                                className="w-5 h-5 rounded-full"
                                                            />
                                                        )}
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{token.symbol}</span>
                                                            <span className="text-xs text-gray-500">{token.name}</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        {token.balance}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="to">To Address</Label>
                                <Input
                                    id="to"
                                    placeholder="0x..."
                                    value={formData.to}
                                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label htmlFor="amount">Amount</Label>
                                    <span className="text-sm text-gray-500">
                                        Balance: {selectedToken.balance} {selectedToken.symbol}
                                    </span>
                                </div>
                                <Input
                                    id="amount"
                                    type="number"
                                    step="any"
                                    min="0"
                                    placeholder="0.0"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>

                            {selectedToken.symbol === "ETH" && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="gasLimit">Gas Limit (Optional)</Label>
                                        <Input
                                            id="gasLimit"
                                            type="number"
                                            min="21000"
                                            placeholder="21000"
                                            value={formData.gasLimit}
                                            onChange={(e) => setFormData({ ...formData, gasLimit: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="maxFeePerGas">Max Fee Per Gas (Optional)</Label>
                                        <Input
                                            id="maxFeePerGas"
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={formData.maxFeePerGas}
                                            onChange={(e) => setFormData({ ...formData, maxFeePerGas: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="maxPriorityFeePerGas">Max Priority Fee Per Gas (Optional)</Label>
                                        <Input
                                            id="maxPriorityFeePerGas"
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={formData.maxPriorityFeePerGas}
                                            onChange={(e) => setFormData({ ...formData, maxPriorityFeePerGas: e.target.value })}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Send {selectedToken.symbol}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 