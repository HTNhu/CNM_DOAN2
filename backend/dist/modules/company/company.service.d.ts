import { AccountService } from '../account/account.service';
import { Company, Customer } from './company.entity';
export declare class CompanyService {
    private readonly accService;
    constructor(accService: AccountService);
    findAllCompany(): Promise<Company[]>;
    findCompanyByUsername(username: any): Promise<Company>;
    findCompanyByName(name: any): Promise<any>;
    create(compInput: any): Promise<Boolean>;
    findCompanyByService(service: any): Promise<Company[]>;
    update(username: string, lstCustomer: [Customer]): Promise<Boolean>;
}
