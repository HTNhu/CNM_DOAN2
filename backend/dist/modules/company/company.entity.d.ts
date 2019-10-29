export declare class Company {
    userId: string;
    name: string;
    phone: string;
    address: string;
    logo: string;
    service: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    lstCustomer: [Customer];
}
export declare class Customer {
    id: string;
    name: string;
    address: string;
    phone: string;
}
export declare class CustomerInput {
    id: string;
    name: string;
    address: string;
    phone: string;
}
export declare class CompanyInput {
    name: string;
    phone: string;
    address: string;
    username: string;
    password: string;
    logo: string;
    service: string;
    lstCustomer: [CustomerInput];
}
