import { Company, CompanyInput, CustomerInput } from './company.entity';
import { CompanyService } from './company.service';
export declare class CompanyResolver {
    private readonly companyService;
    constructor(companyService: CompanyService);
    getAllCompany(): Promise<Company[]>;
    getCompanyByUsername(username: string): Promise<Company>;
    getCompanyByService(service: string): Promise<Company[]>;
    updateListCustomerCompany(username: string, lstCustomer: [CustomerInput]): Promise<Boolean>;
    createCompany(companyInput: CompanyInput): Promise<Boolean>;
}
