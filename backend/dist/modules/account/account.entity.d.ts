export declare class Account {
    userId: string;
    username: string;
    password: string;
    type: string;
    createdAt: string;
    updatedAt: string;
}
export declare class AccountInput {
    username: string;
    password: string;
    type: string;
}
export declare class LoginRes {
    userId: string;
    token: string;
    type: string;
}
