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
const dynamoDB = require('../../dynamoDB');
const uuid = require("uuid");
let ScheduleService = class ScheduleService {
    constructor() { }
    async findScheduleByMember(memberId) {
        const a = await dynamoDB.scan({
            TableName: 'ScheduleReminder',
            FilterExpression: '#memberId = :memberId and #isRead = :isRead',
            ExpressionAttributeNames: {
                '#memberId': 'memberId',
                '#isRead': 'isRead'
            },
            ExpressionAttributeValues: {
                ':memberId': memberId,
                ':isRead': false
            },
        });
        if (a.Count === 0)
            return [];
        return a.Items;
    }
    async create(scheduleInput) {
        await dynamoDB.putItem({
            TableName: 'ScheduleReminder',
            Item: {
                "id": uuid.v4(),
                "memberId": scheduleInput.memberId,
                "companyId": scheduleInput.companyId,
                "companyname": scheduleInput.companyname,
                "message": `Bạn có hóa đơn mới từ công ty ${scheduleInput.companyname}`,
                "isRead": false,
                "phone": scheduleInput.phone,
                "createdAt": Date.now()
            }
        });
        return true;
    }
    async update(id, memberId) {
        try {
            const a = await dynamoDB.updateItem({
                TableName: "ScheduleReminder",
                Key: {
                    "id": id,
                    "memberId": memberId
                },
                UpdateExpression: "set #isRead = :isRead",
                ExpressionAttributeNames: {
                    "#isRead": "isRead"
                },
                ExpressionAttributeValues: {
                    ":isRead": true
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
ScheduleService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ScheduleService);
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=schedule.service.js.map