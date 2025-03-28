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

interface AddTokenDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (token: {
        address: string;
        symbol: string;
        decimals: number;
        name: string;
    }) => void;
}

export default function AddTokenDialog({ isOpen, onClose, onAdd }: AddTokenDialogProps) {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        address: "",
        symbol: "",
        decimals: "",
        name: "",
    });

    const validateForm = () => {
        // Token Address validation
        if (!formData.address.trim()) {
            toast({
                title: "Error",
                description: "Please enter a token address",
                variant: "destructive",
            });
            return false;
        }
        if (!/^0x[a-fA-F0-9]{40}$/.test(formData.address)) {
            toast({
                title: "Error",
                description: "Please enter a valid token address",
                variant: "destructive",
            });
            return false;
        }

        // Token Symbol validation
        if (!formData.symbol.trim()) {
            toast({
                title: "Error",
                description: "Please enter a token symbol",
                variant: "destructive",
            });
            return false;
        }
        if (formData.symbol.length > 10) {
            toast({
                title: "Error",
                description: "Token symbol must be less than 10 characters",
                variant: "destructive",
            });
            return false;
        }
        if (!/^[A-Za-z0-9]+$/.test(formData.symbol)) {
            toast({
                title: "Error",
                description: "Token symbol can only contain letters and numbers",
                variant: "destructive",
            });
            return false;
        }

        // Decimals validation
        if (!formData.decimals.trim()) {
            toast({
                title: "Error",
                description: "Please enter token decimals",
                variant: "destructive",
            });
            return false;
        }
        const decimals = parseInt(formData.decimals);
        if (isNaN(decimals)) {
            toast({
                title: "Error",
                description: "Decimals must be a number",
                variant: "destructive",
            });
            return false;
        }
        if (decimals < 0 || decimals > 18) {
            toast({
                title: "Error",
                description: "Decimals must be between 0 and 18",
                variant: "destructive",
            });
            return false;
        }

        // Token Name validation
        if (!formData.name.trim()) {
            toast({
                title: "Error",
                description: "Please enter a token name",
                variant: "destructive",
            });
            return false;
        }
        if (formData.name.length > 50) {
            toast({
                title: "Error",
                description: "Token name must be less than 50 characters",
                variant: "destructive",
            });
            return false;
        }

        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        onAdd({
            address: formData.address.trim().toLowerCase(),
            symbol: formData.symbol.trim().toUpperCase(),
            decimals: parseInt(formData.decimals),
            name: formData.name.trim(),
        });

        // Reset form
        setFormData({
            address: "",
            symbol: "",
            decimals: "",
            name: "",
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Custom Token</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="address">Token Address</Label>
                            <Input
                                id="address"
                                placeholder="e.g. 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="symbol">Token Symbol</Label>
                            <Input
                                id="symbol"
                                placeholder="e.g. UNI"
                                value={formData.symbol}
                                onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                                maxLength={10}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="decimals">Token Decimals</Label>
                            <Input
                                id="decimals"
                                type="number"
                                placeholder="e.g. 18"
                                value={formData.decimals}
                                onChange={(e) => setFormData({ ...formData, decimals: e.target.value })}
                                min={0}
                                max={18}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Token Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g. Uniswap"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                maxLength={50}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-6">
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Add Token
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