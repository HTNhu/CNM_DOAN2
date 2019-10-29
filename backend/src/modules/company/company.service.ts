import { Injectable, ParseUUIDPipe } from '@nestjs/common'
import { ApolloError } from 'apollo-server-core'
import { AccountService } from '../account/account.service'
import { Company, Customer } from './company.entity'
import * as uuid from 'uuid'
const dynamoDB = require('../../dynamoDB')
@Injectable()
export class CompanyService {
    constructor(
        private readonly accService: AccountService
    ) { }
    async findAllCompany(): Promise<Company[]> {
        const a = await dynamoDB.scan({
            TableName: 'User_TransactionHistory',
            FilterExpression: '#type = :type',
            ExpressionAttributeNames: {
                '#type': 'type',
            },
            ExpressionAttributeValues: {
                ':type': 'company',
            },
        })
        if (a.Count === 0) return []
        return a.Items
    }
    
    async findCompanyByUsername(username): Promise<Company> {
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
        })
        if (a.Count === 0) return null
        return a.Items[0]
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
        })
    }
    async create(compInput): Promise<Boolean> {
        console.log(compInput)
        const existCompany = await this.findCompanyByName(compInput.name)
        const existUsername = await this.findCompanyByUsername(compInput.username)
        if (existCompany.Count !== 0 || existUsername) throw new ApolloError('Company existed', '401')
        // const id = await this.accService.signup({username: compInput.username, password: compInput.password, type: "company" })
       
       
        await dynamoDB.putItem({
            TableName: 'User_TransactionHistory',
            Item: {
                "username": compInput.username,
                "password": await this.accService.hashPassword(compInput.password),
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
                "lstCustomer" : compInput.lstCustomer
            }
        })

        return true
    }
    async findCompanyByService(service) : Promise<Company[]> {
       const a=  await dynamoDB.scan({
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
        })
        if (a.Count === 0) return []
     return a.Items

    }
    async update(username: string, lstCustomer: [Customer]): Promise<Boolean> {
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
            })
            console.log("UPDATE")
            console.log('ok')
            return true
        } catch (err) {
            console.error("sdfd", err)
            return false
        }

    }
}
