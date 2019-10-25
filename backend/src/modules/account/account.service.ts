import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

import * as uuid from 'uuid'
import { ApolloError } from 'apollo-server-core'
import {
	Account,
	LoginRes
	// AccountInput
} from './account.entity'
const dynamoDB = require('../../dynamoDB')
const bcrypt = require('bcrypt')
@Injectable()
export class AccountService {
	constructor() { }
	async findAllAccount(): Promise<Account[]> {
		const a = await dynamoDB.scan({
			TableName: 'User_TransactionHistory',
			// FilterExpression: '#key = :key',
            // ExpressionAttributeNames: {
            //     '#key': 'username',
            // },
            // ExpressionAttributeValues: {
            //     ':key': 'Account'
            // },
		})
		const lst = []
		a.Items.forEach(element => {
			const acc = new Account();
			acc.userId = element.userId
			acc.username = element.username
			acc.type = element.type
			acc.password = element.password
			acc.createdAt = element.createdAt
			acc.updatedAt = element.updatedAt
			lst.push(acc)
		});
		return lst
	}

	hashPassword = async (password: string): Promise<string> => {
		return await bcrypt.hash(password, 10)
	}
	async generateAccessToken(acc: Account) {
		const token = await jwt.sign(
			{ userId: acc.userId }, 'somesupersecretkey'
		)
		return { userId: acc.userId, token, type: acc.type }
	}

	isPasswordMatched = async (
		rawPassword: string,
		encodedPassword: string
	): Promise<boolean> => {
		return await bcrypt.compare(rawPassword, encodedPassword)
	}
	async findAccountByUsername(username): Promise<Account> {
		const a = await dynamoDB.scan({
			TableName: 'User_TransactionHistory',
			FilterExpression: '#username = :username',
            ExpressionAttributeNames: {
                '#username': 'username',
            },
            ExpressionAttributeValues: {
                ':username': username
            },
		})
		if (a.Count === 0) return null
		const acc = new Account()
		if (a.Items[0].username === username) {
			acc.userId = a.Items[0].userId
			acc.username = a.Items[0].username
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
				throw new ApolloError('Unauthorized', '404')
			}
			// if (acc.password !== password) throw new ApolloError('Wrongpassword', '401')
		
			if(!(await this.isPasswordMatched(password, acc.password))) {
				
			throw new ApolloError('Wrong password', '401')
			}
			return await this.generateAccessToken(acc)
		} catch (err) {
			throw new ApolloError(err, '500', {})
		}
	}
	// async signup(accInput): Promise<String> {
	// 	const existAcc = await this.findAccountByUsername(accInput.username)
	// 	if (existAcc) throw new ApolloError('Username existed', '401')
	// 	const id = uuid.v4()
	// 	await dynamoDB.putItem({
	// 		TableName: 'User_TransactionHistory',
	// 		Item: {
	// 			"userId": uuid.v4(),
	// 			"username":  accInput.username,
	// 			"password": await this.hashPassword(accInput.password),
	// 			"type": accInput.type,
	// 			"createdAt": Date.now(),
    //             "updatedAt": Date.now()
	// 		}
	// 	})
	// 	return id
	// }
	async updateAccount(type,username,password): Promise<Boolean> {
		try{
			const a =await dynamoDB.updateItem({
				TableName: "User_TransactionHistory",
				Key: {
					"username": username,
					"type": type
				},
				UpdateExpression: "set #pw = :pw, #updatedAt = :updatedAt",
				ExpressionAttributeNames: {
					"#pw": "password",
					"#updatedAt": "updatedAt"
				},
				ExpressionAttributeValues: {
					":pw": await this.hashPassword(password),
					":updatedAt": Date.now()
				},
				ReturnValues: "UPDATED_NEW"
			})
			console.log("UPDATE")
			console.log(a)
			return true
		}catch (err){
			console.error(err)
		}
		
	}


}