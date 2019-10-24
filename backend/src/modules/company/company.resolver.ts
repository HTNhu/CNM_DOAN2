import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { Company, CompanyInput } from './company.entity'
import { CompanyService } from './company.service'
@Resolver('Company')
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) { }

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
  async createCompany(@Args('compInput') companyInput: CompanyInput) {
    return this.companyService.create(companyInput)
  }
}
