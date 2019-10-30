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
const account_service_1 = require("../account/account.service");
const dynamoDB = require('../../dynamoDB');
let HistoryService = class HistoryService {
    constructor(accService) {
        this.accService = accService;
    }
    async create(hisInput) {
        try {
            await dynamoDB.putItem({
                TableName: "History",
                Item: {
                    "billId": hisInput.billId,
                    "type": hisInput.type,
                    "company": hisInput.company,
                    "companyname": hisInput.companyname,
                    "name": hisInput.name,
                    "username": hisInput.username,
                    "total": hisInput.total,
                    "paidAt": Date.now()
                }
            });
            return true;
        }
        catch (err) {
            return false;
        }
    }
    async findHistoryByCompany(company) {
        try {
            const a = await dynamoDB.scan({
                TableName: "History",
                FilterExpression: " #company = :company",
                ExpressionAttributeNames: {
                    "#company": "company"
                },
                ExpressionAttributeValues: {
                    ":company": company
                },
            });
            return a.Items;
        }
        catch (err) {
        }
    }
    async findHistoryByMember(username) {
        const a = await dynamoDB.scan({
            TableName: "History",
            FilterExpression: " #username = :username",
            ExpressionAttributeNames: {
                "#username": "username"
            },
            ExpressionAttributeValues: {
                ":username": username
            },
        });
        // console.log("kq", a);
        return a.Items;
    }
};
HistoryService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], HistoryService);
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map