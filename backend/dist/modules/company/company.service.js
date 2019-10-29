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
const uuid = require("uuid");
const dynamoDB = require('../../dynamoDB');
let CompanyService = class CompanyService {
    constructor(accService) {
        this.accService = accService;
    }
    async findAllCompany() {
        const a = await dynamoDB.scan({
            TableName: 'User_TransactionHistory',
            FilterExpression: '#type = :type',
            ExpressionAttributeNames: {
                '#type': 'type',
            },
            ExpressionAttributeValues: {
                ':type': 'company',
            },
        });
        if (a.Count === 0)
            return [];
        return a.Items;
    }
    async findCompanyByUsername(username) {
        const a = await dynamoDB.scan({
            TableName: 'User_TransactionHistory',
            FilterExpression: '#type = :type and #username = :username',
            ExpressionAttributeNames: {
                '#type': 'type',
                '#username': 'username'
            },
            ExpressionAttributeValues: {
                ':type': 'company',
                ':username': username
            },
        });
        if (a.Count === 0)
            return null;
        return a.Items[0];
    }
    async findCompanyByName(name) {
        return await dynamoDB.scan({
            TableName: 'User_TransactionHistory',
            FilterExpression: '#key = :key and #name = :name',
            ExpressionAttributeNames: {
                '#key': 'type',
                '#name': 'name'
            },
            ExpressionAttributeValues: {
                ':key': 'company',
                ':name': name
            },
        });
    }
    async create(compInput) {
        console.log(compInput);
        const existCompany = await this.findCompanyByName(compInput.name);
        const existUsername = await this.findCompanyByUsername(compInput.username);
        if (existCompany.Count !== 0 || existUsername)
            throw new apollo_server_core_1.ApolloError('Company existed', '401');
        await dynamoDB.putItem({
            TableName: 'User_TransactionHistory',
            Item: {
                "username": compInput.username,
                "password": compInput.password,
                "type": 'company',
                "userId": uuid.v4(),
                "data": compInput.phone,
                "name": compInput.name,
                "address": compInput.address,
                "phone": compInput.phone,
                "logo": compInput.logo,
                "service": compInput.service,
                "createdAt": Date.now(),
                "updatedAt": Date.now(),
                "lstCustomer": compInput.lstCustomer
            }
        });
        return true;
    }
    async findCompanyByService(service) {
        const a = await dynamoDB.scan({
            TableName: 'User_TransactionHistory',
            FilterExpression: '#service = :service and #type= :type',
            ExpressionAttributeNames: {
                '#service': 'service',
                '#type': 'type'
            },
            ExpressionAttributeValues: {
                ':service': service,
                ':type': 'company'
            }
        });
        if (a.Count === 0)
            return [];
        return a.Items;
    }
    async update(username, lstCustomer) {
        try {
            await dynamoDB.updateItem({
                TableName: "User_TransactionHistory",
                Key: {
                    "username": username,
                    "type": 'company'
                },
                UpdateExpression: "set #lstCustomer = :lstCustomer, #updatedAt = :updatedAt",
                ExpressionAttributeNames: {
                    "#lstCustomer": "lstCustomer",
                    "#updatedAt": "updatedAt"
                },
                ExpressionAttributeValues: {
                    ":lstCustomer": lstCustomer,
                    ":updatedAt": Date.now()
                },
                ReturnValues: "UPDATED_NEW"
            });
            console.log("UPDATE");
            console.log('ok');
            return true;
        }
        catch (err) {
            console.error("sdfd", err);
            return false;
        }
    }
};
CompanyService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map