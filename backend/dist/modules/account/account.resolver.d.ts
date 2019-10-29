import { Account } from './account.entity';
import { AccountService } from './account.service';
export declare class AccountResolver {
    private readonly accountService;
    constructor(accountService: AccountService);
    getAllAccount(): Promise<Account[]>;
    login(username: string, password: string): Promise<import("./account.entity").LoginRes>;
    updateAccount(type: string, username: string, password: string): Promise<Boolean>;
}
