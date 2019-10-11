import { Resolver, Query, Args } from '@nestjs/graphql'
import { Account, LoginRes } from './account.entity'
import {AccountService} from './account.service'
const AWS = require('aws-sdk')
@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Query(() => LoginRes)
  async login(
    @Args('username') username: string,
    @Args('password') password: string
  ) {
      return this.accountService.Login(username, password)
  }
}
