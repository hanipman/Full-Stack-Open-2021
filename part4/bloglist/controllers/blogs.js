const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', { username: 1, name: 1})

	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	if (!request.body.title || !request.body.author) {
		response.status(400).json({ error: 'malformed title or author' })
		return
	}
	const token = request.token
	const decodedToken = jwt.verify(token, process.env.SECRET)
	const user = await User.findById(decodedToken.id)
	const blog = new Blog({
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes,
		user: user._id
	})
	const newBlog = await blog.save()
	user.blogs = user.blogs.concat(newBlog._id)
	await user.save()
	response.status(201).json(newBlog)
})

blogsRouter.put('/:id', async (request, response) => {
	const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
	response.json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
	const token = request.token
	const decodedToken = jwt.verify(token, process.env.SECRET)
	const user = await User.findById(decodedToken.id)
	if (!user.blogs.includes(request.params.id)) {
		return response.status(403).json({
			error: 'user does not have permission to delete blog'
		})
	}
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

module.exports = blogsRouter