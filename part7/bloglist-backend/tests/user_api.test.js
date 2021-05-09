const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
	await User.deleteMany({})

	const userObjects = helper.initialUsers
		.map(user => new User(user))
	const promiseArray = userObjects.map(user => user.save())
	await Promise.all(promiseArray)
})

describe('test creating new user', () => {
	test ('test successful creation of new user', async () => {
		const newUser = {
			username: 'user_4',
			name: 'name',
			password: 'pass'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(result.body.username).toEqual('user_4')
	})

	test('missing username', async () => {
		const newUser = {
			name: 'name',
			password: 'pass'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
	})
	
	test('short username', async () => {
		const newUser = {
			username: 'a',
			name: 'name',
			password: 'pass'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
	})
	
	test('non unique username', async () => {
		const newUser = {
			username: helper.initialUsers[0].username,
			name: 'name',
			password: 'pass'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
	})

	test('missing password', async () => {
		const newUser = {
			username: 'user_4',
			name: 'name',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
	})

	test('short password', async () => {
		const newUser = {
			username: 'user_4',
			name: 'name',
			password: 'a'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
	})
})

afterAll(() => {
	mongoose.connection.close()
})