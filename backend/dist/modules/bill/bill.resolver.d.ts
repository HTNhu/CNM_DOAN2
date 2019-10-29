import { ElectricBillInput, WaterBillInput, ElectricBill } from './bill.entity';
import { BillService } from './bill.service';
export declare class BillResolver {
    private readonly billService;
    constructor(billService: BillService);
    getElectricBillsByCompany(companyId: string): Promise<ElectricBill>;
    getWaterBillsByCompany(companyId: string): Promise<ElectricBill>;
    getElectricBillsByCompanyPhone(companyId: string, phone: string): Promise<ElectricBill>;
    createWaterBill(waterbillInput: WaterBillInput): Promise<Boolean>;
    createElectricBill(electricbillInput: ElectricBillInput): Promise<Boolean>;
    updateStatusBill(billId: string, companyId: string): Promise<Boolean>;
}
