import { Account } from '../types/account';

class AccountService {
    private static instance: AccountService;
    private accounts: Account[] = [];
    private readonly STORAGE_KEY = 'wallet_accounts';

    private constructor() {
        this.loadAccounts();
    }

    public static getInstance(): AccountService {
        if (!AccountService.instance) {
            AccountService.instance = new AccountService();
        }
        return AccountService.instance;
    }

    private async loadAccounts(): Promise<void> {
        try {
            const result = await chrome.storage.local.get(this.STORAGE_KEY);
            this.accounts = result[this.STORAGE_KEY] || [];
        } catch (error) {
            console.error('Failed to load accounts:', error);
            this.accounts = [];
        }
    }

    private async saveAccounts(): Promise<void> {
        try {
            await chrome.storage.local.set({ [this.STORAGE_KEY]: this.accounts });
        } catch (error) {
            console.error('Failed to save accounts:', error);
        }
    }

    public async addAccount(account: Account): Promise<void> {
        if (this.accounts.some(acc => acc.address === account.address)) {
            throw new Error('Account already exists');
        }
        this.accounts.push(account);
        await this.saveAccounts();
    }

    public async removeAccount(address: string): Promise<void> {
        this.accounts = this.accounts.filter(acc => acc.address !== address);
        await this.saveAccounts();
    }

    public async updateAccount(account: Account): Promise<void> {
        const index = this.accounts.findIndex(acc => acc.address === account.address);
        if (index === -1) {
            throw new Error('Account not found');
        }
        this.accounts[index] = account;
        await this.saveAccounts();
    }

    public getAccounts(): Account[] {
        return [...this.accounts];
    }

    public getAccount(address: string): Account | undefined {
        return this.accounts.find(acc => acc.address === address);
    }

    public async clearAccounts(): Promise<void> {
        this.accounts = [];
        await this.saveAccounts();
    }
}

export default AccountService; 