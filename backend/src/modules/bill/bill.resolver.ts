import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { ElectricBillInput, WaterBillInput, ElectricBill } from './bill.entity'
import { BillService } from './bill.service'
@Resolver('Bill')
export class BillResolver {
  constructor(private readonly billService: BillService) { }
  @Query(() => [ElectricBill])
  async getElectricBillsByCompany(
    @Args('companyId') companyId: string
  ) {
    return this.billService.findBillByCompany(companyId)
  }
  @Query(() => [ElectricBill])
  async getWaterBillsByCompany(
    @Args('companyId') companyId: string
  ) {
    return this.billService.findBillByCompany(companyId)
  }
  @Query(() => ElectricBill)
  async getElectricBillsByCompanyPhone(
    @Args('companyId') companyId: string,
    @Args('phone') phone: string
  ) {
    return this.billService.findBillByCompanyPhone(companyId, phone)
  }
  @Mutation(() => Boolean)
  async createWaterBill(
    @Args('waterbillInput') waterbillInput: WaterBillInput
  ) {
    return this.billService.createWaterBill(waterbillInput)
  }
  
  @Mutation(() => Boolean)
  async createElectricBill(@Args('electricbillInput') electricbillInput: ElectricBillInput) {
    return this.billService.createElectricBill(electricbillInput)
  }
  @Mutation(() => Boolean)
  async updateStatusBill(
    @Args('billId') billId: string,
  @Args('companyId') companyId: string) {
    return this.billService.update(billId,companyId)
  }
}
