import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { ArrowLeft, Plus, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mainnet, sepolia } from "viem/chains";

export default function Networks() {
    const navigate = useNavigate();
    const networks = [mainnet, sepolia];

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
                        <Button variant="outline" size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Network
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {networks.map((network) => (
                                <div
                                    key={network.id}
                                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <Network className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{network.name}</div>
                                            <div className="text-sm text-gray-500">{network.rpcUrls.default.http[0]}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Chain ID: {network.id}
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