import React, { useState } from 'react'
// import blogsService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, removeBlog, username }) => {
	const [viewDetails, setViewDetails] = useState(false)

	const handleView = (event) => {
		event.preventDefault()
		setViewDetails(!viewDetails)
	}

	const addLike = (event) => {
		event.preventDefault()
		handleLike({
			likes: blog.likes + 1,
			title: blog.title,
			author: blog.author,
			url: blog.url,
			user: blog.user.id
		}, blog.id)
	}

	const detailView = () => {
		return (
			<div>
				<div>
					{blog.url}
				</div>
				<div>
					likes {blog.likes}
					<button onClick={addLike}>
						like
					</button>
				</div>
				<div>
					{blog.user.name}
				</div>
				{username === blog.user.username ? <button onClick={removeBlog} value={blog.id}>remove</button> : null}
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

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	handleLike: PropTypes.func,
	removeBlog: PropTypes.func,
	username: PropTypes.string.isRequired
}

export default Blog