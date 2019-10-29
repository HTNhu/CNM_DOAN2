import { Schedule } from './schedule.entity';
export declare class ScheduleService {
    constructor();
    findScheduleByMember(memberId: any): Promise<Schedule[]>;
    create(scheduleInput: any): Promise<Boolean>;
    update(id: any, memberId: any): Promise<Boolean>;
}
