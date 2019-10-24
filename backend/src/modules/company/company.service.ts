import { Injectable, ParseUUIDPipe } from '@nestjs/common'
import { ApolloError } from 'apollo-server-core'
import { AccountService } from '../account/account.service'
import { Company } from './company.entity'
import * as uuid from 'uuid'
const dynamoDB = require('../../dynamoDB')
@Injectable()
export class CompanyService {
    constructor(
        private readonly accService: AccountService
    ) { }
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
        const comp = new Company()
        if (a.Items[0].username === username) {
            comp.userId = a.Items[0].userId
            comp.phone = a.Items[0].phone
            comp.name = a.Items[0].name
            comp.address = a.Items[0].address
            comp.logo = a.Items[0].logo
            comp.service = a.Items[0].service
            comp.username = a.Items[0].username
            comp.password = a.Items[0].password
            comp.createdAt = a.Items[0].createdAt
            comp.updatedAt = a.Items[0].updatedAt
            comp.lstCustomer = a.Items[0].lstCustomer
            
        }
        return comp
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
        console.log(a.Items,"sà")
        const lst = []
        await a.Items.forEach(async element => {
            const comp = new Company();
            comp.userId = element.userId
            comp.username = element.username
            comp.name = element.name
            comp.address = element.address
            comp.logo = element.logo
            comp.service = element.service
            lst.push(comp)
        })
        console.log(lst)
     return lst

    }
}
