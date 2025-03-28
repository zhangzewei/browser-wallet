import { useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../../hooks/use-toast";

interface AddNetworkDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (network: {
        name: string;
        rpcUrl: string;
        chainId: number;
        symbol: string;
        explorerUrl: string;
    }) => void;
}

export default function AddNetworkDialog({ isOpen, onClose, onAdd }: AddNetworkDialogProps) {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        rpcUrl: "",
        chainId: "",
        symbol: "",
        explorerUrl: "",
    });

    const validateForm = () => {
        // Network Name validation
        if (!formData.name.trim()) {
            toast({
                title: "Error",
                description: "Please enter a network name",
                variant: "destructive",
            });
            return false;
        }
        if (formData.name.length > 50) {
            toast({
                title: "Error",
                description: "Network name must be less than 50 characters",
                variant: "destructive",
            });
            return false;
        }

        // RPC URL validation
        if (!formData.rpcUrl.trim()) {
            toast({
                title: "Error",
                description: "Please enter an RPC URL",
                variant: "destructive",
            });
            return false;
        }
        try {
            new URL(formData.rpcUrl);
        } catch {
            toast({
                title: "Error",
                description: "Please enter a valid RPC URL (e.g., https://eth-mainnet.g.alchemy.com/v2/your-api-key)",
                variant: "destructive",
            });
            return false;
        }

        // Chain ID validation
        if (!formData.chainId.trim()) {
            toast({
                title: "Error",
                description: "Please enter a Chain ID",
                variant: "destructive",
            });
            return false;
        }
        const chainId = parseInt(formData.chainId);
        if (isNaN(chainId)) {
            toast({
                title: "Error",
                description: "Chain ID must be a number",
                variant: "destructive",
            });
            return false;
        }
        if (chainId < 1 || chainId > 999999) {
            toast({
                title: "Error",
                description: "Chain ID must be between 1 and 999999",
                variant: "destructive",
            });
            return false;
        }

        // Currency Symbol validation
        if (!formData.symbol.trim()) {
            toast({
                title: "Error",
                description: "Please enter a currency symbol",
                variant: "destructive",
            });
            return false;
        }
        if (formData.symbol.length > 10) {
            toast({
                title: "Error",
                description: "Currency symbol must be less than 10 characters",
                variant: "destructive",
            });
            return false;
        }
        if (!/^[A-Za-z0-9]+$/.test(formData.symbol)) {
            toast({
                title: "Error",
                description: "Currency symbol can only contain letters and numbers",
                variant: "destructive",
            });
            return false;
        }

        // Explorer URL validation (optional)
        if (formData.explorerUrl.trim()) {
            try {
                new URL(formData.explorerUrl);
            } catch {
                toast({
                    title: "Error",
                    description: "Please enter a valid explorer URL (e.g., https://etherscan.io)",
                    variant: "destructive",
                });
                return false;
            }
        }

        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        onAdd({
            name: formData.name.trim(),
            rpcUrl: formData.rpcUrl.trim(),
            chainId: parseInt(formData.chainId),
            symbol: formData.symbol.trim().toUpperCase(),
            explorerUrl: formData.explorerUrl.trim(),
        });

        // Reset form
        setFormData({
            name: "",
            rpcUrl: "",
            chainId: "",
            symbol: "",
            explorerUrl: "",
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Custom Network</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Network Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g. Ethereum Mainnet"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                maxLength={50}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rpcUrl">RPC URL</Label>
                            <Input
                                id="rpcUrl"
                                placeholder="e.g. https://eth-mainnet.g.alchemy.com/v2/your-api-key"
                                value={formData.rpcUrl}
                                onChange={(e) => setFormData({ ...formData, rpcUrl: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="chainId">Chain ID</Label>
                            <Input
                                id="chainId"
                                type="number"
                                placeholder="e.g. 1"
                                value={formData.chainId}
                                onChange={(e) => setFormData({ ...formData, chainId: e.target.value })}
                                min={1}
                                max={999999}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="symbol">Currency Symbol</Label>
                            <Input
                                id="symbol"
                                placeholder="e.g. ETH"
                                value={formData.symbol}
                                onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                                maxLength={10}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="explorerUrl">Block Explorer URL (Optional)</Label>
                            <Input
                                id="explorerUrl"
                                placeholder="e.g. https://etherscan.io"
                                value={formData.explorerUrl}
                                onChange={(e) => setFormData({ ...formData, explorerUrl: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-6">
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Add Network
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
} 