import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { Schedule, ScheduleInput } from './schedule.entity'
import { ScheduleService } from './schedule.service'
@Resolver('Schedule')
export class ScheduleResolver {
  constructor(private readonly memberService: ScheduleService) { }

  @Query(() => [Schedule])
  async getScheduleByMember(
    @Args('memberId') memberId: String
  ) {
    return []
  }
  @Mutation(() => [Boolean])
  async createSchedule(@Args('scheduleInput') scheduleInput: ScheduleInput) {
    return true
  }
  @Mutation(() => [Boolean])
  async updateSchedule(@Args('id') id: String, @Args('memberId') memberId: String) {
    return true
  }
}
