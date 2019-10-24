import { Injectable } from '@nestjs/common'
import { ApolloError } from 'apollo-server-core'
import { AccountService } from '../account/account.service'
import { Member } from './member.entity'
const dynamoDB = require('../../dynamoDB')
import * as uuid from 'uuid'
@Injectable()
export class MemberService {
    constructor(
        private readonly accService: AccountService
    ) { }
    async findMemberByUsername(username): Promise<Member> {
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
        })
        if (a.Count === 0) return null
        const mem = new Member()
        if (a.Items[0].username === username) {
            mem.userId = a.Items[0].userId
            mem.phone = a.Items[0].phone
            mem.name = a.Items[0].name
            mem.address = a.Items[0].address
            mem.username = a.Items[0].username
            mem.password = a.Items[0].password
            mem.createdAt = a.Items[0].createdAt
            mem.updatedAt = a.Items[0].updatedAt
        }
        return mem
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
        })
    }
    async create(memInput): Promise<Boolean> {
        const existMember = await this.findUserByPhoneUsername(memInput.phone)
        const existUsername = await this.findMemberByUsername(memInput.username)
        console.log("sfdg",existMember, existUsername)
        if (existMember.Count !== 0 || existUsername) throw new ApolloError('Member existed', '401')
        // const id = await this.accService.signup({ username: memInput.username, password: memInput.password, type: "member" })
        // console.log("idđ", id)
        await dynamoDB.putItem({
            TableName: 'User_TransactionHistory',
            Item: {
                "userId": uuid.v4(),
				"username":  memInput.username,
				"password": await this.accService.hashPassword(memInput.password),
				"type":'member',
				"createdAt": Date.now(),
                "updatedAt": Date.now(),
                "phone": memInput.phone,
                "name": memInput.name,
                "address": memInput.address
            }
        })

        return true
    }

}
