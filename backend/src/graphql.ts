
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class AccountInput {
    username: string;
    password: string;
    type: string;
}

export class CompanyInput {
    name: string;
    phone: string;
    address?: string;
    logo?: string;
    username: string;
    password?: string;
    serviceId?: string;
}

export class MemberInput {
    name: string;
    phone: string;
    address?: string;
    username: string;
    password?: string;
}

export class Account {
    userId: string;
    username: string;
    password?: string;
    type?: string;
    createdAt?: string;
    updatedAt?: string;
}

export class Company {
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

export class LoginRes {
    userId?: string;
    token?: string;
    type?: string;
}

export class Member {
    userId: string;
    name: string;
    phone: string;
    address?: string;
    username: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}

export abstract class IMutation {
    abstract updateAccount(type?: string, username?: string, password?: string): boolean | Promise<boolean>;

    abstract login(username: string, password: string): LoginRes | Promise<LoginRes>;

    abstract createCompany(compInput?: CompanyInput): boolean | Promise<boolean>;

    abstract createMember(memInput?: MemberInput): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract getAllAccount(): Account[] | Promise<Account[]>;

    abstract getCompanyByUsername(username?: string): Company | Promise<Company>;

    abstract getCompanyByServiceId(serviceId?: string): Company[] | Promise<Company[]>;

    abstract getMemberByUsername(username?: string): Member | Promise<Member>;

    abstract getAllService(): Service[] | Promise<Service[]>;
}

export class Service {
    id: string;
    name: string;
}
