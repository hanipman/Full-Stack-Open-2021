const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	let sum = 0
	blogs.forEach((blog) => {
		sum += blog.likes
	})
	return sum
}

const favoriteBlog = (blogs) => {
	return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

const mostBlogs = (blogs) => {
	return res = _(blogs)
		.groupBy('author')
		.map((objs, key) => ({
			'author': key,
			'blogs': objs.length
		}))
		.maxBy('blogs')
}

const mostLikes = (blogs) => {
	return res = _(blogs)
		.groupBy('author')
		.map((objs, key) => ({
			'author': key,
			'likes': _.sumBy(objs, 'likes')
		}))
		.maxBy('likes')
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}