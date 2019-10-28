export class WaterBill {
    billId: string
    type: string
    companyId: string 
    name: string
    phone: string
    address: string
    createdAt: Date
    isPaid: Boolean
    description: WaterInput
    total: number
}
export class ElectricBill {
    billId: string
    type: string
    companyId: string 
    name: string
    phone: string
    address: string
    createdAt: Date
    isPaid: Boolean
    description: ElectricInput
    total: number
}
export class WaterInput {
  LNTT: number
  unitPrice: number
}
export class ElectricInput {
    DNTT: number
    unitPrice: number
}
export class ElectricBillInput {
    billId: string
    companyId: string 
    companyname: string
    name: string
    phone: string
    address: string
    createdAt: Date
    description: ElectricInput
    total: number
}
export class WaterBillInput {
    billId: string
    companyId: string
    companyname: string 
    name: string
    phone: string
    address: string
    createdAt: Date
    description: WaterInput
    total: number
}
