import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import {Member, MemberInput} from './member.entity'
import {MemberService} from './member.service'
@Resolver('Member')
export class MemberResolver {
    constructor(private readonly memberService: MemberService) {}

    @Query(() => Member)
  async getMemberByAcc(
    @Args('id') id: string
  ) {
      return this.memberService.findMemberByAcc(id)
  }
    @Mutation(() => [Boolean])
    async createMember(@Args('memInput') memIput: MemberInput) {
        return this.memberService.create(memIput)
    }
}
