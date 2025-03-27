import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { ArrowLeft, Copy } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mnemonic, setMnemonic] = useState('');

    const handleCreateAccount = () => {
        if (!password || !confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        // TODO: Generate mnemonic using crypto library
        const generatedMnemonic = "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12";
        setMnemonic(generatedMnemonic);
    };

    const handleCopyMnemonic = () => {
        navigator.clipboard.writeText(mnemonic);
        toast.success('Mnemonic copied to clipboard');
    };

    return (
        <div className="p-4">
            <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="mb-4"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle>Create New Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
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

                        {mnemonic && (
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
                                <div className="mt-2 text-sm text-destructive">
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