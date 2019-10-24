export class WaterBill {
    billId: string
    type: string
    companyId: string 
    name: string
    phone: string
    address: string
    createdAt: Date
    updatedAt: Date
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
    updatedAt: Date
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
    companyId: string 
    companyname: string
    name: string
    phone: string
    address: string
    description: ElectricInput
}
export class WaterBillInput {
    companyId: string
    companyname: string 
    name: string
    phone: string
    address: string
    description: WaterInput
}
