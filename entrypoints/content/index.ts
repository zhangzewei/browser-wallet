import { defineContentScript } from 'wxt/sandbox';
import contentProvider from './provider';

export default defineContentScript({
    matches: ['<all_urls>'],
    runAt: 'document_start',
    main() {
        // 注册 content provider
        contentProvider;

        // Inject the script into the page
        const injectScript = () => {
            try {
                const script = document.createElement('script');
                script.src = chrome.runtime.getURL('injected.js');
                script.onload = () => script.remove();
                (document.head || document.documentElement).appendChild(script);
            } catch (error) {
                console.error('Error injecting script:', error);
            }
        };

        // Execute injection when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', injectScript);
        } else {
            injectScript();
        }
    },
}); 