export class Schedule {
  id: string 
  companyId: string
  memberId: string
  message: string
  isRead: Boolean
}
export class ScheduleInput {
  companyId: string
  memberId: string
  message: string
  isRead: Boolean
}
