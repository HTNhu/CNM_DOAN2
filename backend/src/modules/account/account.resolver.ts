import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { Account , AccountInput} from './account.entity'
import {AccountService} from './account.service'
const AWS = require('aws-sdk')
@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}
  @Query(() => [Account])
  async getAllAccount() {
      return this.accountService.findAllAccount()
  }
  @Mutation(() => Account)
  async login(
    @Args('username') username: string,
    @Args('password') password: string
  ) {
      return this.accountService.Login(username, password)
  }

  @Mutation(() => Boolean)
  async updateAccount(
    @Args('type') type: string,
    @Args('username') username:string,
    @Args('password') password :string,
  ) {
      return this.accountService.updateAccount(type,username, password)
  }
}
