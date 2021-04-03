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
	const counts = _.countBy(blogs, (blog) => {
		return blog.author
	})
	const key =  Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b)

	return {
		author: key,
		blogs: counts[key]
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
}