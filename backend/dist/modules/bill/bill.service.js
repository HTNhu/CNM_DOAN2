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
let BillService = class BillService {
    constructor(accService) {
        this.accService = accService;
    }
    async createElectricBill(eInput) {
        try {
            await dynamoDB.putItem({
                TableName: 'Bill',
                Item: {
                    "billId": eInput.billId,
                    "type": 'Điện',
                    "companyId": eInput.companyId,
                    "companyname": eInput.companyname,
                    "createdAt": eInput.createdAt,
                    "phone": eInput.phone,
                    "name": eInput.name,
                    "address": eInput.address,
                    "isPaid": false,
                    "description": eInput.description,
                    "total": eInput.total
                }
            });
            return true;
        }
        catch (err) {
            return false;
        }
    }
    async createWaterBill(wInput) {
        try {
            await dynamoDB.putItem({
                TableName: 'Bill',
                Item: {
                    "billId": wInput.billId,
                    "type": 'Nước',
                    "companyId": wInput.companyId,
                    "companyname": wInput.companyname,
                    "createdAt": wInput.createdAt,
                    "phone": wInput.phone,
                    "name": wInput.name,
                    "address": wInput.address,
                    "isPaid": false,
                    "description": wInput.description,
                    "total": wInput.total
                }
            });
            return true;
        }
        catch (err) {
            return false;
        }
    }
    async findBillByCompany(companyId) {
        const a = await dynamoDB.scan({
            TableName: 'Bill',
            FilterExpression: ' #companyId = :companyId and #isPaid = :isPaid',
            ExpressionAttributeNames: {
                '#companyId': 'companyId',
                '#isPaid': 'isPaid'
            },
            ExpressionAttributeValues: {
                ':companyId': companyId,
                ':isPaid': false
            },
        });
        // console.log("kq", a);
        return a.Items;
    }
    async findBillByCompanyPhone(companyId, phone) {
        const a = await dynamoDB.scan({
            TableName: 'Bill',
            FilterExpression: ' #companyId = :companyId and #phone = :phone and #isPaid = :isPaid',
            ExpressionAttributeNames: {
                '#companyId': 'companyId',
                '#phone': 'phone',
                '#isPaid': 'isPaid'
            },
            ExpressionAttributeValues: {
                ':companyId': companyId,
                ':phone': phone,
                ':isPaid': false
            },
        });
        // console.log("kqby phone", a);
        if (a.Count === 0)
            return null;
        return a.Items[0];
    }
    async update(billId, companyId) {
        try {
            await dynamoDB.updateItem({
                TableName: "Bill",
                Key: {
                    "billId": billId,
                    "companyId": companyId
                },
                UpdateExpression: "set #isPaid = :isPaid, #updatedAt = :updatedAt",
                ExpressionAttributeNames: {
                    "#isPaid": "isPaid",
                    "#updatedAt": "updatedAt"
                },
                ExpressionAttributeValues: {
                    ":isPaid": true,
                    ":updatedAt": Date.now()
                },
                ReturnValues: "UPDATED_NEW"
            });
            // console.log("UPDATE");
            // console.log('ok');
            return true;
        }
        catch (err) {
            console.error("sdfd", err);
            return false;
        }
    }
};
BillService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], BillService);
exports.BillService = BillService;
//# sourceMappingURL=bill.service.js.map