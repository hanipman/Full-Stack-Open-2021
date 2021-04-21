const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const login = async () => {
	const login_det = helper.initialUsers[0]
	delete login_det.name

	const user = await api
		.post('/api/login')
		.send(login_det)
	return user.body.token
}

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs
		.map(blog => new Blog(blog))
	const blogPromises = blogObjects.map(blog => blog.save())
	await Promise.all(blogPromises)

	await User.deleteMany({})

	await Promise.all(helper.initialUsers.map(async (user) => {
		await api.post('/api/users').send(user)
	}))

	// const login_det = helper.initialUsers[0]
	// delete login_det.name

	// const user = await api
	// 	.post('/api/login')
	// 	.send(login_det)
	// const token = user.body.token
})

describe('testing get blogs', () => {
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
		const token = await login()

		const newBlog = {
			title: 'new title',
			author: 'new author',
			url: 'new url',
			likes: 16
		}

		const response = await api
			.post('/api/blogs')
			.auth(token, { type: 'bearer' })
			.send(newBlog)
			.expect(201)

		expect(response.body.likes).toBe(newBlog.likes)

		const allBlogs = await api.get('/api/blogs')

		expect(allBlogs.body).toHaveLength(7)
	})

	test('test default likes to 0 for new blogs', async () => {
		const token = await login()

		const newBlog = {
			title: 'new title',
			author: 'new author',
			url: 'new url',
		}

		const response = await api
			.post('/api/blogs')
			.auth(token, { type: 'bearer' })
			.send(newBlog)

			
		expect(response.body.likes).toBe(0)

		const allBlogs = await api.get('/api/blogs')

		expect(allBlogs.body).toHaveLength(7)
	})

	test('blogs with no title or author should return 400 error', async () => {
		const token = await login()

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
			.auth(token, { type: 'bearer' })
			.send(newBlogNoTitle)
			.expect(400)

		expect(response_no_title.body.error).toEqual('malformed title or author')

		const response_no_author = await api
			.post('/api/blogs')
			.auth(token, { type: 'bearer' })
			.send(newBlogNoAuthor)
			.expect(400)

		expect(response_no_author.body.error).toEqual('malformed title or author')
	})

	test('creating blog without proper authorization returns 401', async () => {
		const newBlog = {
			title: 'new title',
			author: 'new author',
			url: 'new url',
			likes: 16
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(401)
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
		const token = await login()

		const newBlog = {
			title: 'abcd',
			author: 'efgh',
			url: 'ijkl',
			likes: 16
		}	

		await api
			.post('/api/blogs')
			.auth(token, { type: 'bearer' })
			.send(newBlog)

		const list = await api.get('/api/blogs')

		const user_blog = list.body.filter(blog => blog.title === newBlog.title)[0]

		const id = user_blog.id

		await api
			.delete(`/api/blogs/${id}`)
			.auth(token, { type: 'bearer' })
			.expect(204)

		const response = await api.get('/api/blogs')
		
		expect(response.body).toHaveLength(6)
	})
	test('delete a blog without proper authorization returns 401', async () => {
		const token = await login()

		const newBlog = {
			title: 'abcd',
			author: 'efgh',
			url: 'ijkl',
			likes: 16
		}	

		await api
			.post('/api/blogs')
			.auth(token, { type: 'bearer' })
			.send(newBlog)

		const list = await api.get('/api/blogs')

		const user_blog = list.body.filter(blog => blog.title === newBlog.title)[0]

		const id = user_blog.id

		await api
			.delete(`/api/blogs/${id}`)
			.expect(401)
	})
})

afterAll(() => {
	mongoose.connection.close()
})