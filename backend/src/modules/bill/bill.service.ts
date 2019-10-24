import { Injectable } from '@nestjs/common'
import { ApolloError } from 'apollo-server-core'
import { AccountService } from '../account/account.service'
import { WaterBillInput, ElectricBillInput, ElectricBill } from './bill.entity'
const dynamoDB = require('../../dynamoDB')
import * as uuid from 'uuid'
@Injectable()
export class BillService {
    constructor(
        private readonly accService: AccountService
    ) { }
    async createElectricBill(eInput: ElectricBillInput): Promise<Boolean> {
       try{
        await dynamoDB.putItem({
            TableName: 'Bill',
            Item: {
                "billId": uuid.v4(),
				"type":  'Điện',
				"companyId": eInput.companyId,
				"companyname": eInput.companyname,
				"createdAt": Date.now(),
                "updatedAt": Date.now(),
                "phone": eInput.phone,
                "name": eInput.name,
                "address": eInput.address,
                "isPaid": false,
                "description": eInput.description,
                "total": eInput.description.DNTT * eInput.description.unitPrice
            }
        })
        return true
    }catch( err){
            return false
       }
       
    }
    async createWaterBill(wInput: WaterBillInput): Promise<Boolean> {
        try{
         await dynamoDB.putItem({
             TableName: 'Bill',
             Item: {
                 "billId": uuid.v4(),
                 "type":  'Điện',
                 "companyId": wInput.companyId,
                 "companyname": wInput.companyname,
                 "createdAt": Date.now(),
                 "updatedAt": Date.now(),
                 "phone": wInput.phone,
                 "name": wInput.name,
                 "address": wInput.address,
                 "isPaid": true,
                 "description": wInput.description
             }
         })
         return true
     }catch( err){
             return false
        }
        
     }
    async findBillByCompany(companyId: string) : Promise<ElectricBill>  {
        const a= await dynamoDB.scan({
            TableName: 'Bill',
            FilterExpression: ' #companyId = :companyId',
            ExpressionAttributeNames: {
                '#companyId': 'companyId'
            },
            ExpressionAttributeValues: {
                ':companyId': companyId,
            },
        })
        console.log("kq", a)
        return a.Items
    }
    async findBillByCompanyPhone(companyId: string, phone: string) : Promise<ElectricBill>  {
        const a = await dynamoDB.scan({
            TableName: 'Bill',
            FilterExpression: ' #companyId = :companyId && #phone = :phone && #isPaid = #isPaid' ,
            ExpressionAttributeNames: {
                '#companyId': 'companyId',
                '#phone': 'phone',
                '#isPaid': 'isPaid'
            },
            ExpressionAttributeValues: {
                ':companyId': companyId,
                ':phone': phone,
                '#isPaid': false
            },
        })
        console.log("kqby phone", a)
        return a.Items[0]
    }
    // async create(memInput): Promise<Boolean> {
    //     const existMember = await this.findUserByPhoneUsername(memInput.phone)
    //     const existUsername = await this.findMemberByUsername(memInput.username)
    //     console.log("sfdg",existMember, existUsername)
    //     if (existMember.Count !== 0 || existUsername) throw new ApolloError('Member existed', '401')
    //     // const id = await this.accService.signup({ username: memInput.username, password: memInput.password, type: "member" })
    //     // console.log("idđ", id)
    //     await dynamoDB.putItem({
    //         TableName: 'User_TransactionHistory',
    //         Item: {
    //             "userId": uuid.v4(),
	// 			"username":  memInput.username,
	// 			"password": await this.accService.hashPassword(memInput.password),
	// 			"type":'member',
	// 			"createdAt": Date.now(),
    //             "updatedAt": Date.now(),
    //             "phone": memInput.phone,
    //             "name": memInput.name,
    //             "address": memInput.address
    //         }
    //     })

    //     return true
    // }

}
