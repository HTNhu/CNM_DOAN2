import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberResolver } from './member.resolver'
@Module({
  providers: [MemberResolver ,MemberService]
})
export class MemberModule {}
