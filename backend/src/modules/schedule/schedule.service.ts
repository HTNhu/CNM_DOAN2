import { Injectable } from '@nestjs/common'
import { ApolloError } from 'apollo-server-core'
import { Schedule, ScheduleInput } from './schedule.entity'
const dynamoDB = require('../../dynamoDB')
import * as uuid from 'uuid'
@Injectable()
export class ScheduleService {
    constructor() { }
    async findScheduleByMember(memberId ): Promise<Schedule[]> {
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
        })
        if (a.Count === 0) return []
        return a.Items
    }
    
    async create(scheduleInput ): Promise<Boolean> {
        await dynamoDB.putItem({
            TableName: 'ScheduleReminder',
            Item: {
                "id": uuid.v4(),
				"memberId":  scheduleInput.memberId,
                "companyId": scheduleInput.companyId,
                "companyname": scheduleInput.companyname,
                "message": `Bạn có hóa đơn mới từ công ty ${scheduleInput.companyname}`,
                "isRead": false,
                "phone": scheduleInput.phone,
                "createdAt": Date.now()
            }
        })

        return true
    }
    async update(id, memberId): Promise<Boolean> {
		try{
			const a =await dynamoDB.updateItem({
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
			})
			console.log("UPDATE")
			console.log(a)
			return true
		}catch (err){
			console.error(err)
		}
		
	}

}
