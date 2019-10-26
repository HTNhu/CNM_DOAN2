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
                 "type":  'Nước',
                 "companyId": wInput.companyId,
                 "companyname": wInput.companyname,
                 "createdAt": Date.now(),
                 "updatedAt": Date.now(),
                 "phone": wInput.phone,
                 "name": wInput.name,
                 "address": wInput.address,
                 "isPaid": false,
                 "description": wInput.description,
                 "total": wInput.description.LNTT * wInput.description.unitPrice
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
            FilterExpression: ' #companyId = :companyId and #isPaid = :isPaid',
            ExpressionAttributeNames: {
                '#companyId': 'companyId',
                '#isPaid': 'isPaid'
            },
            ExpressionAttributeValues: {
                ':companyId': companyId,
                ':isPaid': false
            },
        })
        console.log("kq", a)
        return a.Items
    }
    
    async findBillByCompanyPhone(companyId: string, phone: string) : Promise<ElectricBill>  {
        const a = await dynamoDB.scan({
            TableName: 'Bill',
            FilterExpression: ' #companyId = :companyId and #phone = :phone and #isPaid = :isPaid' ,
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
        })
        console.log("kqby phone", a)
        if(a.Count ===0) return null
        return a.Items[0]
    }
    async update(billId: string, companyId: string): Promise<Boolean> {
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
        })
        console.log("UPDATE")
        console.log('ok')
        return true
    }catch (err){
        console.error("sdfd",err)
    }
        // return true
    }

