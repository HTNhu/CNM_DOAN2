import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { Account, LoginRes , AccountInput} from './account.entity'
import {AccountService} from './account.service'
const AWS = require('aws-sdk')
@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}
  @Query(() => [Account])
  async getAllAccount() {
      return this.accountService.findAllAccount()
  }
  @Query(() => LoginRes)
  async login(
    @Args('username') username: string,
    @Args('password') password: string
  ) {
      return this.accountService.Login(username, password)
  }
  @Mutation(() => String)
  async signup(
    @Args('accInput') accInput: AccountInput,
  ) {
      return this.accountService.signup(accInput)
  }
  @Mutation(() => Boolean)
  async updateAccount(
    @Args('id') id:string,
    @Args('password') password :string,
  ) {
      return this.accountService.updateAccount(id, password)
  }
}
