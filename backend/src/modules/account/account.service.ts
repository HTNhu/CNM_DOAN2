import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { ApolloError } from 'apollo-server-core'
import {
	LoginRes,
	Account
} from './account.entity'

var dynamoDB = require('../../dynamoDB/index.js')

@Injectable()
export class AccountService {
	constructor(

	) { }
	async generateAccessToken(acc: Account) {
		const token = await jwt.sign(
			{ id: acc.id }
		)
		return {  id: acc.id,token, type: acc.type }
	}

	hashPassword = async (password: string): Promise<string> => {
		return await bcrypt.hash(password, 10)
	}

	isPasswordMatched = async (
		rawPassword: string,
		encodedPassword: string
	): Promise<boolean> => {
		return await bcrypt.compare(rawPassword, encodedPassword)
	}
	async findAccountByUsername(username): Promise<Account> {
		return await dynamoDB.getItem({
				TableName: 'CNM_DOAN2',
				KeyConditionExpression: '#pk = :pk and #un = :un',
				ExpressionAttributeNames: {
					'#pk': 'partitionKey',
					'#un': 'data'
				},
				ExpressionAttributeValues: {
					':pk': 'Account',
					':un': username
				}
			})
		}
	async Login(username, password): Promise<LoginRes>{
		const acc =await this.findAccountByUsername(username)
		if (!acc) {
			throw new ApolloError('Unauthorized', '401')
		}
		if (!(await this.isPasswordMatched(password, acc.password))) {
			throw new ApolloError('Unauthorized', '401')
		}
		return await this.generateAccessToken(acc)
	} catch (err) {
		throw new ApolloError(err, '500', {})
	}
	
}