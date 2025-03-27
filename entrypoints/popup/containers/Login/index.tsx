import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Plus, Import } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
    const [privateKey, setPrivateKey] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    const navigate = useNavigate();

    const handleImport = () => {
        if (!privateKey && !mnemonic) {
            toast.error('Please enter your credentials');
            return;
        }
        // TODO: Implement import logic
        toast.success('Import successful');
    };

    const handleCreateNewAccount = () => {
        navigate('/register');
    };

    return (
        <div className="p-4">
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Import Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Tabs defaultValue="privateKey" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="privateKey">Private Key</TabsTrigger>
                                <TabsTrigger value="mnemonic">Mnemonic</TabsTrigger>
                            </TabsList>
                            <TabsContent value="privateKey">
                                <Input
                                    type="password"
                                    placeholder="Enter your private key"
                                    value={privateKey}
                                    onChange={(e) => setPrivateKey(e.target.value)}
                                    className="w-full"
                                />
                            </TabsContent>
                            <TabsContent value="mnemonic">
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
                            className="w-full"
                        >
                            <Import className="mr-2 h-4 w-4" />
                            Import Account
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Create New Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={handleCreateNewAccount}
                        className="w-full"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Account
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
