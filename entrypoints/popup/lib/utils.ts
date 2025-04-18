import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { MessageType } from "../../../constants"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function sendMessageFromPopup(
    params: {
        type: MessageType;
        action?: string;
        payload: any;
    },
    callback?: (response: any) => void
) {
    chrome.runtime.sendMessage(params, (response) => {
        callback?.(response);
    });
}

export function shortenAddress(address: string) {
    return address.slice(0, 6) + '...' + address.slice(-4);
}