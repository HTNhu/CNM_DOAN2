import { Schedule, ScheduleInput } from './schedule.entity';
import { ScheduleService } from './schedule.service';
export declare class ScheduleResolver {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
    getScheduleByMember(memberId: String): Promise<Schedule[]>;
    createSchedule(scheduleInput: ScheduleInput): Promise<Boolean>;
    updateSchedule(id: String, memberId: String): Promise<Boolean>;
}
