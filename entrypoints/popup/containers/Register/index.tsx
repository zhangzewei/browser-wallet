import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { ArrowLeft, Copy } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { generateMnemonic, english } from 'viem/accounts';

export default function Register() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    const { toast } = useToast();

    const handleCreateAccount = () => {
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
            console.log(newMnemonic);
            setMnemonic(newMnemonic);

            // TODO: Encrypt the mnemonic with the password
            // TODO: Store the encrypted mnemonic securely

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
        toast({
            variant: "success",
            title: "Success",
            description: "Mnemonic copied to clipboard",
        });
    };

    return (
        <div className="p-4 h-screen flex flex-col">
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>Create New Account</CardTitle>
                </CardHeader>
                <CardContent className="h-full flex flex-col">
                    <div className="space-y-4 flex-1">
                        {!mnemonic ? (
                            <>
                                <Input
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full"
                                />
                                <Input
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full"
                                />
                                <Button
                                    onClick={handleCreateAccount}
                                    className="w-full"
                                >
                                    Generate Account
                                </Button>
                                <Button
                                    onClick={() => navigate('/login')}
                                    className="w-full"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Login
                                </Button>
                            </>
                        ) : (
                            <div className="mt-4">
                                <div className="mb-2 font-medium">Your Mnemonic (Save this securely!):</div>
                                <div className="bg-muted p-3 rounded-md break-words flex items-center justify-between">
                                    <span>{mnemonic}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={handleCopyMnemonic}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="mt-2 text-sm text-red">
                                    ⚠️ Warning: Never share your mnemonic with anyone!
                                </div>
                                <Button
                                    onClick={() => navigate('/login')}
                                    className="w-full mt-4"
                                >
                                    I've Saved My Mnemonic
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}