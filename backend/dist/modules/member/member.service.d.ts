import { AccountService } from '../account/account.service';
import { Member, MemberResSchedule } from './member.entity';
export declare class MemberService {
    private readonly accService;
    constructor(accService: AccountService);
    findAllMember(): Promise<MemberResSchedule[]>;
    findMemberByUsername(username: any): Promise<Member>;
    findUserByPhoneUsername(phone: any): Promise<any>;
    create(memInput: any): Promise<Boolean>;
}
