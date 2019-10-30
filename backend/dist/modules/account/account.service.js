"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const apollo_server_core_1 = require("apollo-server-core");
const account_entity_1 = require("./account.entity");
const dynamoDB = require('../../dynamoDB');
let AccountService = class AccountService {
    constructor() { }
    async findAllAccount() {
        const a = await dynamoDB.scan({
            TableName: 'User_TransactionHistory',
        });
        const lst = [];
        a.Items.forEach(element => {
            const acc = new account_entity_1.Account();
            acc.userId = element.userId;
            acc.username = element.username;
            acc.type = element.type;
            acc.password = element.password;
            acc.createdAt = element.createdAt;
            acc.updatedAt = element.updatedAt;
            lst.push(acc);
        });
        return lst;
    }
    async generateAccessToken(acc) {
        const token = await jwt.sign({ userId: acc.userId }, 'somesupersecretkey');
        return { userId: acc.userId, token, type: acc.type };
    }
    async findAccountByUsername(username) {
        const a = await dynamoDB.scan({
            TableName: 'User_TransactionHistory',
            FilterExpression: '#username = :username',
            ExpressionAttributeNames: {
                '#username': 'username',
            },
            ExpressionAttributeValues: {
                ':username': username
            },
        });
        if (a.Count === 0)
            return null;
        const acc = new account_entity_1.Account();
        if (a.Items[0].username === username) {
            acc.userId = a.Items[0].userId;
            acc.username = a.Items[0].username;
            acc.type = a.Items[0].type;
            acc.password = a.Items[0].password;
            // console.log(acc, a.Items[0]);
        }
        return acc;
    }
    async Login(username, password) {
        try {
            let acc = new account_entity_1.Account();
            acc = await this.findAccountByUsername(username);
            if (!acc) {
                throw new apollo_server_core_1.ApolloError('Unauthorized', '404');
            }
            if (password !== acc.password) {
                throw new apollo_server_core_1.ApolloError('Wrong password', '401');
            }
            return await this.generateAccessToken(acc);
        }
        catch (err) {
            throw new apollo_server_core_1.ApolloError(err, '500', {});
        }
    }
    async updateAccount(type, username, password) {
        try {
            const a = await dynamoDB.updateItem({
                TableName: "User_TransactionHistory",
                Key: {
                    "username": username,
                    "type": type
                },
                UpdateExpression: "set #pw = :pw, #updatedAt = :updatedAt",
                ExpressionAttributeNames: {
                    "#pw": "password",
                    "#updatedAt": "updatedAt"
                },
                ExpressionAttributeValues: {
                    ":pw": password,
                    ":updatedAt": Date.now()
                },
                ReturnValues: "UPDATED_NEW"
            });
            // console.log("UPDATE");
            // console.log(a);
            return true;
        }
        catch (err) {
            console.error(err);
        }
    }
};
AccountService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map