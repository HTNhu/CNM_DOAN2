export class Account {
  id: string
  username: string
  password: string
  type: string
  createdAt: String
  updatedAt: String
}

export class LoginRes {
  id: string
  token: string
  type: string
}
export class AccountInput {
  username: string
  password: string
  type: string
}
