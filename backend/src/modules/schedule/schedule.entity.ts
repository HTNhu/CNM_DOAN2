export class Schedule {
  id: string 
  companyId: string
  companyname: string
  memberId: string
  message: string
  isRead: Boolean
}
export class ScheduleInput {
  companyId: string
  memberId: string
  message: string
  companyname: string
}
