import { Injectable } from '@nestjs/common'
import { ApolloError } from 'apollo-server-core'
import { AccountService } from '../account/account.service'
import { Member } from './member.entity'
const dynamoDB = require('../../dynamoDB')
@Injectable()
export class MemberService {
    constructor(
         private readonly accService : AccountService
    ){}
    async findMemberByAcc(id) : Promise<Member>{
        const a = await dynamoDB.scan({
            TableName: 'CNM_DOAN2',
            FilterExpression: '#key = :key and #id = :id',
            ExpressionAttributeNames: {
                '#key': 'partitionkey',
                '#id': 'sortkey'
            },
            ExpressionAttributeValues: {
                ':key': 'Member',
                ':id': id
            },
        })
        if (a.Count === 0) return null
		const mem = new Member()
		if (a.Items[0].sortkey === id) {
			mem.id = a.Items[0].sortkey
            mem.phone = a.Items[0].data
            mem.name = a.Items[0].name
			mem.address = a.Items[0].address
		}
		return mem
    }
    async findMemberByPhone(phone){
        return await dynamoDB.scan({
            TableName: 'CNM_DOAN2',
            FilterExpression: '#key = :key and #phone = :phone',
            ExpressionAttributeNames: {
                '#key': 'partitionkey',
                '#phone': 'data'
            },
            ExpressionAttributeValues: {
                ':key': 'Member',
                ':phone': phone
            },
        })
    }
    async create(memInput): Promise<Boolean> {
        const existMember = await this.findMemberByPhone(memInput.phone)
        if (existMember.Count !== 0)throw new ApolloError('Member existed', '401')
        const id = await this.accService.signup({username: memInput.username, password: memInput.password, type: "member" })
        console.log("idđ", id)
        await dynamoDB.putItem({
			TableName: 'CNM_DOAN2',
			Item: {
				"partitionkey": 'Member',
				"sortkey":  id,
				"data": memInput.phone,
				"name": memInput.name,
                "address": memInput.address
			}
        })
        
		return true
    }
    
}
