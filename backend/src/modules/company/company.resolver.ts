import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { Company, CompanyInput, CustomerInput } from './company.entity'
import { CompanyService } from './company.service'
@Resolver('Company')
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) { }
  @Query(() => Company)
  async getAllCompany() {
    return this.companyService.findAllCompany()
  }
  @Query(() => Company)
  async getCompanyByUsername(
    @Args('username') username: string
  ) {
    return this.companyService.findCompanyByUsername(username)
  }
  @Query(() => [Company])
  async getCompanyByService(
    @Args('service') service: string
  ) {
    return this.companyService.findCompanyByService(service)
  }
  @Mutation(() => Boolean)
  async updateListCustomerCompany(
    @Args('username') username: string,
    @Args('lstCustomer') lstCustomer: [CustomerInput]) {
    return this.companyService.update(username, lstCustomer)
  }
  @Mutation(() => Boolean)
  async createCompany(@Args('compInput') companyInput: CompanyInput) {
    return this.companyService.create(companyInput)
  }
}
