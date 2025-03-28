import * as React from "react";
import { cn } from "../../lib/utils";

const Menu = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "fixed inset-0 bg-black/50 z-50",
            className
        )}
        {...props}
    />
));
Menu.displayName = "Menu";

const MenuContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "fixed inset-y-0 right-0 w-[300px] bg-white shadow-lg",
            className
        )}
        {...props}
    />
));
MenuContent.displayName = "MenuContent";

const MenuHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "p-4 border-b flex items-center justify-between",
            className
        )}
        {...props}
    />
));
MenuHeader.displayName = "MenuHeader";

const MenuTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={cn("text-lg font-semibold", className)}
        {...props}
    />
));
MenuTitle.displayName = "MenuTitle";

const MenuBody = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex-1 overflow-y-auto p-4", className)}
        {...props}
    />
));
MenuBody.displayName = "MenuBody";

const MenuItem = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
    <button
        ref={ref}
        className={cn(
            "w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors",
            className
        )}
        {...props}
    />
));
MenuItem.displayName = "MenuItem";

export { Menu, MenuContent, MenuHeader, MenuTitle, MenuBody, MenuItem }; 