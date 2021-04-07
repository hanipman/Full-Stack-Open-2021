const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	if (!request.body.title || !request.body.author) {
		response.status(400).json({ error: 'malformed title or author' })
	}
	const blog = new Blog(request.body)
	await blog.save()
	response.status(201).json(request.body)
})

module.exports = blogsRouter