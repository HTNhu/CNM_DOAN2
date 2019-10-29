import { AccountService } from '../account/account.service';
import { WaterBillInput, ElectricBillInput, ElectricBill } from './bill.entity';
export declare class BillService {
    private readonly accService;
    constructor(accService: AccountService);
    createElectricBill(eInput: ElectricBillInput): Promise<Boolean>;
    createWaterBill(wInput: WaterBillInput): Promise<Boolean>;
    findBillByCompany(companyId: string): Promise<ElectricBill>;
    findBillByCompanyPhone(companyId: string, phone: string): Promise<ElectricBill>;
    update(billId: string, companyId: string): Promise<Boolean>;
}
