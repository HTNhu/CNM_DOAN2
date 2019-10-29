import { History, HistoryInput } from './history.entity';
import { HistoryService } from './history.service';
export declare class HistoryResolver {
    private readonly hisService;
    constructor(hisService: HistoryService);
    getHistoryByCompany(company: string): Promise<History[]>;
    getHistoryByMember(username: string): Promise<History[]>;
    createHistory(hisInput: HistoryInput): Promise<Boolean>;
}
