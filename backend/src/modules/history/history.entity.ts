export class History {
  billId: string
  type: string
  company: string 
  name: string
  member: string
  total: number
  paidAt: Date
}
export class HistoryInput {
  billId: string
  company: string 
  member: string
  name: string
  total: number
  type: string
}

