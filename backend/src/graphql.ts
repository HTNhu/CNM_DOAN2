
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
    listTypeBill?: string[];
}

export class MemberInput {
    name: string;
    phone: string;
    address?: string;
    username: string;
    password?: string;
}

export class Account {
    id: string;
    username: string;
    password?: string;
    type?: string;
    createdAt?: string;
    updatedAt?: string;
}

export class Company {
    id: string;
    name: string;
    phone: string;
    address?: string;
    logo?: string;
    listTypeBill?: string[];
}

export class Member {
    id: string;
    name: string;
    phone: string;
    address?: string;
    username: string;
    password?: string;
}

export abstract class IMutation {
    abstract signup(accInput?: AccountInput): string | Promise<string>;

    abstract updateAccount(username?: string, password?: string): boolean | Promise<boolean>;

    abstract login(username: string, password: string): Account | Promise<Account>;

    abstract createCompany(compInput?: CompanyInput): boolean | Promise<boolean>;

    abstract createMember(memInput?: MemberInput): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract getAllAccount(): Account[] | Promise<Account[]>;

    abstract getCompanyByAcc(id?: string): Company | Promise<Company>;

    abstract getMemberByUsername(username?: string): Member | Promise<Member>;

    abstract getAllService(): Service[] | Promise<Service[]>;
}

export class Service {
    id: string;
    name: string;
}
