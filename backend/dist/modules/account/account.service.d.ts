import { Account, LoginRes } from './account.entity';
export declare class AccountService {
    constructor();
    findAllAccount(): Promise<Account[]>;
    generateAccessToken(acc: Account): Promise<{
        userId: string;
        token: any;
        type: string;
    }>;
    findAccountByUsername(username: any): Promise<Account>;
    Login(username: any, password: any): Promise<LoginRes>;
    updateAccount(type: any, username: any, password: any): Promise<Boolean>;
}
