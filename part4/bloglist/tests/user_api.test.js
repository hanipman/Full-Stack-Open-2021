const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
	await User.deleteMany({})
})

describe('test login', () => {
	test ('test creation of new user', async () => {
		const newUser = {
			username: 'user_1',
			name: 'name_1',
			password: 'pass_1'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(result.body.username).toEqual('user_1')
	})
})

afterAll(() => {
	mongoose.connection.close()
})