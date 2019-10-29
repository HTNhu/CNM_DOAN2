import { AccountService } from '../account/account.service';
import { History, HistoryInput } from './history.entity';
export declare class HistoryService {
    private readonly accService;
    constructor(accService: AccountService);
    create(hisInput: HistoryInput): Promise<Boolean>;
    findHistoryByCompany(company: string): Promise<History[]>;
    findHistoryByMember(username: string): Promise<History[]>;
}
