import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { X, Network, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleNavigate = (path: string) => {
        navigate(path);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50">
            <div className="fixed inset-y-0 right-0 w-[300px] bg-white shadow-lg">
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Settings</h2>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <Card>
                            <CardHeader className="p-4">
                                <CardTitle className="text-base">Networks</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-2"
                                    onClick={() => handleNavigate('/networks')}
                                >
                                    <Network className="h-4 w-4" />
                                    Manage Networks
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="mt-4">
                            <CardHeader className="p-4">
                                <CardTitle className="text-base">Tokens</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <Button variant="ghost" className="w-full justify-start gap-2">
                                    <Coins className="h-4 w-4" />
                                    Manage Tokens
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
} 