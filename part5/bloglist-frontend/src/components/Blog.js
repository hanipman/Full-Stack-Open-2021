import React, { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, update, username }) => {
	const [viewDetails, setViewDetails] = useState(false)
	const [likes, setLikes] = useState(0)

	const handleView = (event) => {
		event.preventDefault()
		setLikes(blog.likes)
		setViewDetails(!viewDetails)
	}

	const handleLike = (event) => {
		event.preventDefault()
		const newBlog = {
			likes: blog.likes + 1,
			title: blog.title,
			author: blog.author,
			url: blog.url,
			user: blog.user.id
		}
		blog.likes = blog.likes + 1
		blogsService.update(newBlog, blog.id)
			.then(() => {
				setLikes(blog.likes)
				update()
			})
	}

	const handleRemove = (event) => {
		event.preventDefault()
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			blogsService.remove(blog.id)
				.then(update())
		}
	}

	const detailView = () => {
		return (
			<div>
				<div>
					{blog.url}
				</div>
				<div>
					likes {likes}
					<button onClick={handleLike}>
						like
					</button>
				</div>
				<div>
					{blog.user.name}
				</div>
				{username === blog.user.username ? <button onClick={handleRemove}>remove</button> : null}
			</div>
		)
	}

	return (
		<div className='blog'>
			{blog.title} {blog.author}
			<button onClick={handleView}>
				{viewDetails ? 'hide' : 'view'}
			</button>
			{viewDetails ? detailView() : null }
		</div>
	)
}

export default Blog