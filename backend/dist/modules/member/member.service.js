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
const apollo_server_core_1 = require("apollo-server-core");
const account_service_1 = require("../account/account.service");
const member_entity_1 = require("./member.entity");
const dynamoDB = require('../../dynamoDB');
const uuid = require("uuid");
let MemberService = class MemberService {
    constructor(accService) {
        this.accService = accService;
    }
    async findAllMember() {
        const a = await dynamoDB.scan({
            TableName: 'User_TransactionHistory',
            FilterExpression: '#type = :type',
            ExpressionAttributeNames: {
                '#type': 'type',
            },
            ExpressionAttributeValues: {
                ':type': 'member',
            },
        });
        if (a.Count === 0)
            return [];
        const lst = [];
        a.Items.forEach(element => {
            const mem = new member_entity_1.MemberResSchedule();
            mem.userId = element.userId;
            mem.phone = element.phone;
            mem.name = element.name;
            lst.push(mem);
        });
        return lst;
    }
    async findMemberByUsername(username) {
        const a = await dynamoDB.scan({
            TableName: 'User_TransactionHistory',
            FilterExpression: '#type = :type and #username = :username',
            ExpressionAttributeNames: {
                '#type': 'type',
                '#username': 'username'
            },
            ExpressionAttributeValues: {
                ':type': 'member',
                ':username': username
            },
        });
        if (a.Count === 0)
            return null;
        return a.Items[0];
    }
    async findUserByPhoneUsername(phone) {
        return await dynamoDB.scan({
            TableName: 'User_TransactionHistory',
            FilterExpression: ' #phone = :phone and  #type = :type ',
            ExpressionAttributeNames: {
                '#type': 'type',
                '#phone': 'phone'
            },
            ExpressionAttributeValues: {
                ':type': 'member',
                ':phone': phone
            },
        });
    }
    async create(memInput) {
        const existMember = await this.findUserByPhoneUsername(memInput.phone);
        const existUsername = await this.findMemberByUsername(memInput.username);
        // console.log("sfdg", existMember, existUsername);
        if (existMember.Count !== 0 || existUsername)
            throw new apollo_server_core_1.ApolloError('Member existed', '401');
        await dynamoDB.putItem({
            TableName: 'User_TransactionHistory',
            Item: {
                "userId": uuid.v4(),
                "username": memInput.username,
                "password": memInput.password,
                "type": 'member',
                "createdAt": Date.now(),
                "updatedAt": Date.now(),
                "phone": memInput.phone,
                "name": memInput.name,
                "address": memInput.address
            }
        });
        return true;
    }
};
MemberService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], MemberService);
exports.MemberService = MemberService;
//# sourceMappingURL=member.service.js.map