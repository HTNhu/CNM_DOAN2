import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

import * as uuid from 'uuid'
import { ApolloError } from 'apollo-server-core'
import {
	LoginRes,
	Account,
	// AccountInput
} from './account.entity'
const dynamoDB = require('../../dynamoDB')
const bcrypt = require('bcrypt')
@Injectable()
export class AccountService {
	constructor() { }
	async findAllAccount(): Promise<Account[]> {
		const a = await dynamoDB.scan({
			TableName: 'CNM_DOAN2',
			FilterExpression: '#key = :key',
            ExpressionAttributeNames: {
                '#key': 'partitionkey',
            },
            ExpressionAttributeValues: {
                ':key': 'Account'
            },
		})
		const lst = []
		a.Items.forEach(element => {
			const acc = new Account();
			acc.id = element.sortkey
			acc.username = element.data
			acc.type = element.type
			acc.password = element.password
			acc.createdAt = element.createdAt
			acc.updatedAt = element.updatedAt
			lst.push(acc)
		});
		return lst
	}
	async generateAccessToken(acc: Account) {
		const token = await jwt.sign(
			{ id: acc.id }, 'somesupersecretkey'
		)
		return { id: acc.id, token, type: acc.type }
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
		const a = await dynamoDB.scan({
			TableName: 'CNM_DOAN2',
			FilterExpression: '#key = :key and #usr = :usr',
			ExpressionAttributeNames: {
				'#key': 'partitionkey',
				'#usr': 'data'
			},
			ExpressionAttributeValues: {
				':key': 'Account',
				':usr': username
			},
		})
		if (a.Count === 0) return null
		const acc = new Account()
		if (a.Items[0].data === username) {
			acc.id = a.Items[0].sortkey
			acc.username = a.Items[0].data
			acc.type = a.Items[0].type
			acc.password = a.Items[0].password
			console.log(acc, a.Items[0])
		}
		return acc
	}
	async Login(username, password): Promise<LoginRes> {
		try {
			let acc = new Account()
			acc = await this.findAccountByUsername(username)
			if (!acc) {
				throw new ApolloError('Unauthorized', '401')
			}
			// if (acc.password !== password) throw new ApolloError('Wrongpassword', '401')
			if(!(await this.isPasswordMatched(password, acc.password))) {
			throw new ApolloError('Unauthorized', '401')
			}
			return await this.generateAccessToken(acc)
		} catch (err) {
			throw new ApolloError(err, '500', {})
		}
	}
	async signup(accInput): Promise<String> {
		const existAcc = await this.findAccountByUsername(accInput.username)
		if (existAcc) throw new ApolloError('Username existed', '401')
		const id = uuid.v4()
		await dynamoDB.putItem({
			TableName: 'CNM_DOAN2',
			Item: {
				"partitionkey": 'Account',
				"sortkey":  id,
				"data": accInput.username,
				"password": await this.hashPassword(accInput.password),
				"type": accInput.type,
				"createdAt": Date.now(),
                "updatedAt": Date.now()
			}
		})
		return id
	}
	async updateAccount(id,password): Promise<Boolean> {
		try{
			await dynamoDB.updateItem({
				TableName: 'CNM_DOAN2',
				Key: {
					"partitionkey": 'Account',
					"sortkey": String(id)
				},
				UpdateExpression: 'set #pw = :pw, #updatedAt = :updatedAt',
				ExpressionAttributeNames: {
					'#pw': 'password',
					'#updatedAt': 'updatedAt'
				},
				ExpressionAttributeValues: {
					':pw': await this.hashPassword(password),
					':updatedAt': Date.now()
				},
				ReturnValues: "UPDATED_NEW"
			})
			return true
		}catch (err){
			console.error(err)
		}
		
	}


}