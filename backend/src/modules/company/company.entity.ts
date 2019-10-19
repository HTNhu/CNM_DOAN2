export class Company {
    userId: string // accID
    name: string
    phone: string
    address: string
    logo: string
    serviceId: string
    username: string
    password: string
    createdAt: Date
    updatedAt: Date
}
export class CompanyInput {
    name: string
    phone: string
    address: string
    username: string
    password: string
    logo: string
    serviceId: string
}
