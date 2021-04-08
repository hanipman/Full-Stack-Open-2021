const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs
		.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

describe('testing get', () => {
	test('blogs returned as json', async () => {
		const response = await api.get('/api/blogs')
		const contents = response.body
		expect(contents).toHaveLength(6)
	})

	test('checks that id of any blog is defined', async () => {
		const response = await api.get('/api/blogs')
		
		expect(response.body[0].id).toBeDefined()
	})
})

describe('testing post', () => {
	test('create new blog post', async () => {
		const newBlog = {
			title: 'new title',
			author: 'new author',
			url: 'new url',
			likes: 16
		}

		const response = await api
			.post('/api/blogs')
			.send(newBlog)

		expect(response.body.likes).toBe(newBlog.likes)

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

			
		expect(response.body.likes).toBe(0)

		const allBlogs = await api.get('/api/blogs')

		expect(allBlogs.body).toHaveLength(7)
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
})

describe('testing put', () => {
	test('update title', async () => {
		const update = {
			likes: 215
		}
		const id = helper.initialBlogs[0]._id
		const result = await api
			.put(`/api/blogs/${id}`)
			.send(update)
			.expect(200)
		expect(result.body.likes).toBe(update.likes)
	})
})

describe('testing delete', () => {
	test('delete a blog by id', async () => {
		const id = helper.initialBlogs[0]._id
		await api
			.delete(`/api/blogs/${id}`)
			.expect(204)

		const response = await api.get('/api/blogs')
		
		expect(response.body).toHaveLength(5)
	})
})

afterAll(() => {
	mongoose.connection.close()
})