import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Import, ArrowLeft, Key, FileText } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

export default function ImportAccount() {
    const [privateKey, setPrivateKey] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleImport = () => {
        if (!privateKey && !mnemonic) {
            toast({
                variant: "error",
                title: "Error",
                description: "Please enter your credentials",
            });
            return;
        }
        // TODO: Implement import logic
        toast({
            variant: "success",
            title: "Success",
            description: "Import successful",
        });
    };

    return (
        <div className="p-4 h-screen flex flex-col bg-blue-50">
            <Card className="flex-1">
                <CardHeader className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-blue-100">
                            <Import className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Import Account</CardTitle>
                    <CardDescription className="text-gray-500">
                        Import your existing wallet
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col">
                    <div className="space-y-4 flex-1">
                        <Tabs defaultValue="privateKey" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="privateKey" className="flex items-center gap-2">
                                    <Key className="h-4 w-4" />
                                    Private Key
                                </TabsTrigger>
                                <TabsTrigger value="mnemonic" className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Mnemonic
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="privateKey" className="space-y-2">
                                <label className="text-sm font-medium">Private Key</label>
                                <Input
                                    type="password"
                                    placeholder="Enter your private key"
                                    value={privateKey}
                                    onChange={(e) => setPrivateKey(e.target.value)}
                                    className="w-full"
                                />
                            </TabsContent>
                            <TabsContent value="mnemonic" className="space-y-2">
                                <label className="text-sm font-medium">Mnemonic</label>
                                <Input
                                    placeholder="Enter your mnemonic (12 words)"
                                    value={mnemonic}
                                    onChange={(e) => setMnemonic(e.target.value)}
                                    className="w-full"
                                />
                            </TabsContent>
                        </Tabs>

                        <Button
                            onClick={handleImport}
                            className="w-full h-12 text-lg"
                            variant="default"
                        >
                            Import Account
                        </Button>
                        <Button
                            onClick={() => navigate('/login')}
                            className="w-full h-12 text-lg"
                            variant="outline"
                        >
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Back to Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 