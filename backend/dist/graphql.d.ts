export declare class AccountInput {
    username: string;
    password: string;
    type: string;
}
export declare class CompanyInput {
    name: string;
    phone: string;
    address?: string;
    logo?: string;
    username: string;
    password?: string;
    serviceId?: string;
}
export declare class MemberInput {
    name: string;
    phone: string;
    address?: string;
    username: string;
    password?: string;
}
export declare class Account {
    userId: string;
    username: string;
    password?: string;
    type?: string;
    createdAt?: string;
    updatedAt?: string;
}
export declare class Company {
    userId: string;
    name: string;
    phone: string;
    address?: string;
    logo?: string;
    serviceId?: string;
    username: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}
export declare class LoginRes {
    userId?: string;
    token?: string;
    type?: string;
}
export declare class Member {
    userId: string;
    name: string;
    phone: string;
    address?: string;
    username: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}
export declare abstract class IMutation {
    abstract updateAccount(type?: string, username?: string, password?: string): boolean | Promise<boolean>;
    abstract login(username: string, password: string): LoginRes | Promise<LoginRes>;
    abstract createCompany(compInput?: CompanyInput): boolean | Promise<boolean>;
    abstract createMember(memInput?: MemberInput): boolean | Promise<boolean>;
}
export declare abstract class IQuery {
    abstract getAllAccount(): Account[] | Promise<Account[]>;
    abstract getCompanyByUsername(username?: string): Company | Promise<Company>;
    abstract getCompanyByServiceId(serviceId?: string): Company[] | Promise<Company[]>;
    abstract getMemberByUsername(username?: string): Member | Promise<Member>;
    abstract getAllService(): Service[] | Promise<Service[]>;
}
export declare class Service {
    id: string;
    name: string;
}
