export class Schedule {
  id: string 
  companyId: string
  companyname: string
  memberId: string
  message: string
  isRead: Boolean
  phone: string
}
export class ScheduleInput {
  companyId: string
  memberId: string
  companyname: string
  phone: string
}
