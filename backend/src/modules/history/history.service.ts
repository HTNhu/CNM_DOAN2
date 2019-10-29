import { Injectable } from '@nestjs/common'
import { ApolloError } from 'apollo-server-core'
import { AccountService } from '../account/account.service'
import { History, HistoryInput } from './history.entity'
const dynamoDB = require('../../dynamoDB')
import * as uuid from 'uuid'
@Injectable()
export class HistoryService {
    constructor(
        private readonly accService: AccountService
    ) { }
    async create(hisInput: HistoryInput): Promise<Boolean> {
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
            })
            return true
        } catch (err) {
            return false
        }
    }
    async findHistoryByCompany(company: string): Promise<History[]> {
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
            })
            return a.Items
        } catch (err) {

        }

    }
    async findHistoryByMember(username: string): Promise<History[]> {
        const a = await dynamoDB.scan({
            TableName: "History",
            FilterExpression: " #username = :username",
            ExpressionAttributeNames: {
                "#username": "username"
            },
            ExpressionAttributeValues: {
                ":username": username
            },
        })
        console.log("kq", a)
        return a.Items
    }
    
    async findHistoryByDate(year: string): Promise<History[]> {
        const a = await dynamoDB.scan({
            TableName: "History",
            FilterExpression: " #paidAt = :paidAt",
            ExpressionAttributeNames: {
                // "#paidAt": "paidAt.year" //Tim năm
            },
            ExpressionAttributeValues: {
                // ":paidAt": paidAt.year // Tìm năm
            },
        })
        console.log("kq", a)
        return a.Items
    }
}
