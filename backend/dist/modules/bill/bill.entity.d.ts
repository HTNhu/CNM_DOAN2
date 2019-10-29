export declare class WaterBill {
    billId: string;
    type: string;
    companyId: string;
    name: string;
    phone: string;
    address: string;
    createdAt: Date;
    isPaid: Boolean;
    description: WaterInput;
    total: number;
}
export declare class ElectricBill {
    billId: string;
    type: string;
    companyId: string;
    name: string;
    phone: string;
    address: string;
    createdAt: Date;
    isPaid: Boolean;
    description: ElectricInput;
    total: number;
}
export declare class WaterInput {
    LNTT: number;
    unitPrice: number;
}
export declare class ElectricInput {
    DNTT: number;
    unitPrice: number;
}
export declare class ElectricBillInput {
    billId: string;
    companyId: string;
    companyname: string;
    name: string;
    phone: string;
    address: string;
    createdAt: Date;
    description: ElectricInput;
    total: number;
}
export declare class WaterBillInput {
    billId: string;
    companyId: string;
    companyname: string;
    name: string;
    phone: string;
    address: string;
    createdAt: Date;
    description: WaterInput;
    total: number;
}
