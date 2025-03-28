import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { ArrowLeft, Plus, Network, Globe, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mainnet, sepolia } from "viem/chains";
import AddNetworkDialog from "../../components/AddNetworkDialog";
import { useToast } from "../../hooks/use-toast";

interface CustomNetwork {
    name: string;
    rpcUrl: string;
    chainId: number;
    symbol: string;
    explorerUrl?: string;
}

export default function Networks() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [customNetworks, setCustomNetworks] = useState<CustomNetwork[]>([]);
    const networks = [mainnet, sepolia];

    const handleAddNetwork = (network: CustomNetwork) => {
        // Check if network with same chainId already exists
        if (networks.some(n => n.id === network.chainId) ||
            customNetworks.some(n => n.chainId === network.chainId)) {
            toast({
                title: "Error",
                description: "Network with this Chain ID already exists",
                variant: "destructive",
            });
            return;
        }

        setCustomNetworks([...customNetworks, network]);
        toast({
            title: "Success",
            description: "Network added successfully",
        });
    };

    const handleDeleteNetwork = (chainId: number) => {
        setCustomNetworks(customNetworks.filter(n => n.chainId !== chainId));
        toast({
            title: "Success",
            description: "Network removed successfully",
        });
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="p-4 bg-white border-b">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <span className="font-medium">Networks</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">Supported Networks</CardTitle>
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
                            <Plus className="h-4 w-4" />
                            Add Network
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Default Networks */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Default Networks</h3>
                                <div className="space-y-2">
                                    {networks.map((network) => (
                                        <div
                                            key={network.id}
                                            className="flex items-center justify-between p-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <Globe className="h-3 w-3 text-blue-600" />
                                                </div>
                                                <span className="font-medium">{network.name}</span>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                ID: {network.id}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Networks */}
                            {customNetworks.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Custom Networks</h3>
                                    <div className="space-y-2">
                                        {customNetworks.map((network) => (
                                            <div
                                                key={network.chainId}
                                                className="flex items-center justify-between p-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors group"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <Network className="h-3 w-3 text-blue-600" />
                                                    </div>
                                                    <span className="font-medium">{network.name}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm text-gray-500">
                                                        ID: {network.chainId}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                                                        onClick={() => handleDeleteNetwork(network.chainId)}
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

            {/* Add Network Dialog */}
            <AddNetworkDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onAdd={handleAddNetwork}
            />
        </div>
    );
} 