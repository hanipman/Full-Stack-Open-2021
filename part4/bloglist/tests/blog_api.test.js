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

test('checks that id of any blog is defined', async () => {
	const response = await api.get('/api/blogs')
	
	expect(response.body[0].id).toBeDefined()
})

test('create new blog post', async () => {
	const newBlog = {
		title: 'new title',
		author: 'new author',
		url: 'new url',
		likes: '16'
	}

	const response = await api
		.post('/api/blogs')
		.send(newBlog)

	expect(response.body).toEqual(newBlog)

	const allBlogs = await api.get('/api/blogs')

	expect(allBlogs.body).toHaveLength(7)
})

test('test default likes to 0 for new blogs', async () => {
	const newBlog = {
		title: 'new title',
		author: 'new author',
		url: 'new url',
	}

	const response = await api
		.post('/api/blogs')
		.send(newBlog)

		
	expect(response.body).toEqual(newBlog)

	const getBlog = await api.get('/api/blogs')
	const result = getBlog.body.filter(blog => blog.title === 'new title')
	console.log(result)
	expect(result[0].likes).toBe(0)
})

test('blogs with no title or author should return 400 error', async () => {
	const newBlogNoTitle = {
		author: 'new author',
		url: 'new url'
	}
	const newBlogNoAuthor = {
		title: 'new title',
		url: 'new url'
	}

	const response_no_title = await api
		.post('/api/blogs')
		.send(newBlogNoTitle)
		.expect(400)

	expect(response_no_title.body.error).toEqual('malformed title or author')

	const response_no_author = await api
		.post('/api/blogs')
		.send(newBlogNoAuthor)
		.expect(400)

	expect(response_no_author.body.error).toEqual('malformed title or author')
})

afterAll(() => {
	mongoose.connection.close()
})