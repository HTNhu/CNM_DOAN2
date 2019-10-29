import { Member, MemberInput, MemberResSchedule } from './member.entity';
import { MemberService } from './member.service';
export declare class MemberResolver {
    private readonly memberService;
    constructor(memberService: MemberService);
    getAllMember(): Promise<MemberResSchedule[]>;
    getMemberByUsername(username: String): Promise<Member>;
    createMember(memIput: MemberInput): Promise<Boolean>;
}
