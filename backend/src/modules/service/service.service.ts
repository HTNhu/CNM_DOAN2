import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

import * as uuid from 'uuid'
import { ApolloError } from 'apollo-server-core'
import {
	Service
} from './service.entity'
const dynamoDB = require('../../dynamoDB')
const bcrypt = require('bcrypt')
@Injectable()
export class ServiceService {
	constructor() { }
	async findAllTypeService(): Promise<Service[]> {
		const a = await dynamoDB.scan({
			TableName: 'Service'
			// /,
			// FilterExpression: '#key = :key',
            // ExpressionAttributeNames: {
            //     '#key': 'partitionkey',
            // },
            // ExpressionAttributeValues: {
            //     ':key': 'TypeBill'
            // },
		})
		const lst = []
		a.Items.forEach(element => {
			const service = new Service();
			service.id = element.serviceId
			service.name = element.name
			service.logo = element.logo;
			
			// typebill.description = element.description
			
			lst.push(service)
		});
		return lst
	}
	
}