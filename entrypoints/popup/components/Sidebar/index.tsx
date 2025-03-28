import { Button } from "../ui/button";
import { X, Network, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuContent, MenuHeader, MenuTitle, MenuBody, MenuItem } from "../ui/menu";

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
        <Menu>
            <MenuContent>
                <MenuHeader>
                    <MenuTitle>Settings</MenuTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                </MenuHeader>
                <MenuBody>
                    <MenuItem onClick={() => handleNavigate('/networks')}>
                        <Network className="h-4 w-4" />
                        Manage Networks
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigate('/tokens')}>
                        <Coins className="h-4 w-4" />
                        Manage Tokens
                    </MenuItem>
                </MenuBody>
            </MenuContent>
        </Menu>
    );
} 