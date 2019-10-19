export class Account {
  userId: string
  username: string
  password: string
  type: string
  createdAt: string
  updatedAt: string
}

export class AccountInput {
  username: string
  password: string
  type: string
}
export class LoginRes {
  userId: string
  token: string
  type: string
}