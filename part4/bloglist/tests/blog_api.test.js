const { TestScheduler } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async() => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs
		.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})


test('blogs returned as json', async () => {
	const response = await api.get('/api/blogs')
	
	expect(response.body).toHaveLength(6)
})

afterAll(() => {
	mongoose.connection.close()
})