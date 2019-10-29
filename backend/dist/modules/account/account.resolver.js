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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const account_entity_1 = require("./account.entity");
const account_service_1 = require("./account.service");
const AWS = require('aws-sdk');
let AccountResolver = class AccountResolver {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async getAllAccount() {
        return this.accountService.findAllAccount();
    }
    async login(username, password) {
        return this.accountService.Login(username, password);
    }
    async updateAccount(type, username, password) {
        return this.accountService.updateAccount(type, username, password);
    }
};
__decorate([
    graphql_1.Query(() => [account_entity_1.Account]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "getAllAccount", null);
__decorate([
    graphql_1.Mutation(() => account_entity_1.Account),
    __param(0, graphql_1.Args('username')),
    __param(1, graphql_1.Args('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "login", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('type')),
    __param(1, graphql_1.Args('username')),
    __param(2, graphql_1.Args('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "updateAccount", null);
AccountResolver = __decorate([
    graphql_1.Resolver('Account'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountResolver);
exports.AccountResolver = AccountResolver;
//# sourceMappingURL=account.resolver.js.map