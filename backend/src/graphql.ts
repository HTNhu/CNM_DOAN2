
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class Account {
    id?: string;
    username: string;
    password?: string;
    type?: string;
}

export class LoginRes {
    id?: string;
    token?: string;
    type?: string;
}

export abstract class IQuery {
    abstract login(username: string, password: string): LoginRes | Promise<LoginRes>;
}
