export class Company {
    userId: string // accID
    name: string
    phone: string
    address: string
    logo: string
    service: string
    username: string
    password: string
    createdAt: Date
    updatedAt: Date
    lstCustomer: [Customer]
}
export class Customer{
    name: string
    address: string
    phone: string
}
export class CustomerInput{
    name: string
    address: string
    phone: string
}
export class CompanyInput {
    name: string
    phone: string
    address: string
    username: string
    password: string
    logo: string
    service: string
    lstCustomer: [CustomerInput]
}
