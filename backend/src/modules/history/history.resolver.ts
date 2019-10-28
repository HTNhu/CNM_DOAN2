import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { History, HistoryInput } from './history.entity'
import { HistoryService } from './history.service'
@Resolver('History')
export class HistoryResolver {
  constructor(private readonly hisService: HistoryService) { }
  @Query(() => [History])
  async getHistoryByCompany(
    @Args('company') company: string
  ) {
    return this.hisService.findHistoryByCompany(company)
  }
  @Query(() => [History])
  async getHistoryByMember(
    @Args('username') username: string) {
    return this.hisService.findHistoryByMember(username)
  }
  @Mutation(() => Boolean)
  async createHistory(
    @Args('hisInput') hisInput: HistoryInput
  ) {
    return this.hisService.create(hisInput)
  }
}
