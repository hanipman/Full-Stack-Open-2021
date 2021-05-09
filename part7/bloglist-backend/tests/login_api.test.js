const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
	await User.deleteMany({})

	await Promise.all(helper.initialUsers.map(async (user) => {
		await api.post('/api/users').send(user)
	}))
})

describe('test login', () => {
	test('test successful login', async () => {
		await api
			.post('/api/login')
			.send({
				username: 'username_1',
				password: 'password_1'
			})
			.expect(200)
	})

	test('test missing username on login', async () => {
		await api
			.post('/api/login')
			.send({
				password: 'password_1'
			})
			.expect(401)
	})

	test('test missing password on login', async () => {
		await api
			.post('/api/login')
			.send({
				username: 'username_1'
			})
			.expect(401)
	})

	test('test incorrect username', async () => {
		await api
			.post('/api/login')
			.send({
				username: 'username',
				password: 'password_1'
			})
			.expect(401)
	})
	
	test('test incorrect password', async () => {
		await api
			.post('/api/login')
			.send({
				username: 'username_1',
				password: 'password_2'
			})
			.expect(401)
	})
})

afterAll(() => {
	mongoose.connection.close()
})