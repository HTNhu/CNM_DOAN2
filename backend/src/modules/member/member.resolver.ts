import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { Member, MemberInput } from './member.entity'
import { MemberService } from './member.service'
@Resolver('Member')
export class MemberResolver {
  constructor(private readonly memberService: MemberService) { }

  @Query(() => Member)
  async getMemberByUsername(
    @Args('username') username: String
  ) {
    return this.memberService.findMemberByUsername(username)
  }
  @Mutation(() => [Boolean])
  async createMember(@Args('memInput') memIput: MemberInput) {
    return this.memberService.create(memIput)
  }
}
