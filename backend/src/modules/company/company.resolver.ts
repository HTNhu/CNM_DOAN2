import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { Company, CompanyInput } from './company.entity'
import { CompanyService } from './company.service'
@Resolver('Company')
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) { }

  @Query(() => Company)
  async getMemberByAcc(
    @Args('id') id: string
  ) {
    return this.companyService.findCompanyByAcc(id)
  }
  @Mutation(() => Boolean)
  async createCompany(@Args('compInput') companyInput: CompanyInput) {
    return this.companyService.create(companyInput)
  }
}
