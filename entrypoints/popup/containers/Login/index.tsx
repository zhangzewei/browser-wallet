import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../components/ui/card";
import { Import, Plus, Wallet } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="p-4 h-screen flex flex-col bg-blue-50">
            <Card className="flex-1">
                <CardHeader className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-blue-100">
                            <Wallet className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Browser Wallet</CardTitle>
                    <CardDescription className="text-gray-500">
                        Your secure crypto wallet in the browser
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col">
                    <div className="space-y-4 flex-1 flex flex-col justify-center">
                        <Button
                            onClick={() => navigate('/import')}
                            className="w-full h-12 text-lg"
                            variant="default"
                        >
                            <Import className="mr-2 h-5 w-5" />
                            Import Account
                        </Button>
                        <Button
                            onClick={() => navigate('/register')}
                            className="w-full h-12 text-lg"
                            variant="outline"
                        >
                            <Plus className="mr-2 h-5 w-5" />
                            Create New Account
                        </Button>
                    </div>
                    <div className="text-center text-sm text-gray-500 mt-4">
                        Secure • Fast • Easy to use
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
