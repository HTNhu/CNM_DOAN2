import { Injectable } from '@nestjs/common'
import { ApolloError } from 'apollo-server-core'
import { AccountService } from '../account/account.service'
import { Company } from './company.entity'
const dynamoDB = require('../../dynamoDB')
@Injectable()
export class CompanyService {
    constructor(
         private readonly accService : AccountService
    ){}
    async findCompanyByAcc(id) : Promise<Company>{
        const a = await dynamoDB.scan({
            TableName: 'CNM_DOAN2',
            FilterExpression: '#key = :key and #id = :id',
            ExpressionAttributeNames: {
                '#key': 'partitionkey',
                '#id': 'sortkey'
            },
            ExpressionAttributeValues: {
                ':key': 'Company',
                ':id': id
            },
        })
        if (a.Count === 0) return null
		const comp = new Company()
		if (a.Items[0].sortkey === id) {
			comp.id = a.Items[0].sortkey
            comp.phone = a.Items[0].data
            comp.name = a.Items[0].name
            comp.address = a.Items[0].address
            comp.logo =a.Items[0].logo
            comp.listTypeBill = a.Items[0].listTypeBill
		}
		return comp
    }
    async findCompanyByName(name){
        return await dynamoDB.scan({
            TableName: 'CNM_DOAN2',
            FilterExpression: '#key = :key and #name = :name',
            ExpressionAttributeNames: {
                '#key': 'partitionkey',
                '#name': 'data'
            },
            ExpressionAttributeValues: {
                ':key': 'Company',
                ':name': name
            },
        })
    }
    async create(compInput): Promise<Boolean> {
        console.log(compInput)
        const existCompany = await this.findCompanyByName(compInput.name)
        if (existCompany.Count !== 0)throw new ApolloError('Company existed', '401')
        const id = await this.accService.signup({username: compInput.username, password: compInput.password, type: "company" })
        await dynamoDB.putItem({
			TableName: 'CNM_DOAN2',
			Item: {
				"partitionkey": 'Company',
				"sortkey":  id,
				"data": compInput.phone,
				"name": compInput.name,
                "address": compInput.address,
                "logo": compInput.logo,
                "listTypeBill": compInput.listTypeBill
			}
        })
        
		return true
    }
    
}
