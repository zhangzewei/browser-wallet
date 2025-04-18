import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../components/ui/card";
import { ArrowLeft, Key, Copy, Check, Home } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { generateMnemonic, english, mnemonicToAccount } from 'viem/accounts';
import { useWallet } from '../../contexts/wallet';
export default function Register() {
    const { wallet, refresh } = useWallet();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleCreateAccount = async () => {
        if (!password || !confirmPassword) {
            toast({
                variant: "error",
                title: "Error",
                description: "Please fill in all fields",
            });
            return;
        }
        if (password !== confirmPassword) {
            toast({
                variant: "error",
                title: "Error",
                description: "Passwords do not match",
            });
            return;
        }
        try {
            // Generate a new mnemonic using viem
            const newMnemonic = generateMnemonic(english);
            setMnemonic(newMnemonic);

            const account = mnemonicToAccount(newMnemonic);

            await wallet.addAccount({
                address: account.address,
                mnemonic: newMnemonic,
            });

            await refresh();

            toast({
                variant: "success",
                title: "Account Created",
                description: "Your mnemonic has been generated. Please save it securely!",
            });
        } catch (error) {
            console.log(error);
            toast({
                variant: "error",
                title: "Error",
                description: "Failed to generate mnemonic. Please try again.",
            });
        }
    };

    const handleCopyMnemonic = () => {
        navigator.clipboard.writeText(mnemonic);
        setCopied(true);
        toast({
            variant: "success",
            title: "Success",
            description: "Mnemonic copied to clipboard",
        });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-4 h-screen flex flex-col bg-blue-50">
            <Card className="flex-1">
                <CardHeader className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-blue-100">
                            <Key className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Create New Account</CardTitle>
                    <CardDescription className="text-gray-500">
                        Set up your secure wallet
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col">
                    <div className="space-y-4 flex-1">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Confirm Password</label>
                            <Input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        {mnemonic && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Your Mnemonic</label>
                                <div className="relative">
                                    <Input
                                        value={mnemonic}
                                        readOnly
                                        className="w-full pr-10"
                                    />
                                    <Button
                                        onClick={handleCopyMnemonic}
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    >
                                        {copied ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                <div className="text-sm text-red">
                                    ⚠️ Warning: Never share your mnemonic with anyone!
                                </div>
                            </div>
                        )}

                        {!mnemonic ? (
                            <>
                                <Button
                                    onClick={handleCreateAccount}
                                    className="w-full h-12 text-lg"
                                    variant="default"
                                >
                                    Create Account
                                </Button>
                                <Button
                                    onClick={() => navigate('/login')}
                                    className="w-full h-12 text-lg"
                                    variant="outline"
                                >
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                    Back to Login
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={() => navigate('/home')}
                                className="w-full h-12 text-lg"
                                variant="default"
                            >
                                <Home className="mr-2 h-5 w-5" />
                                Go to Home
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}