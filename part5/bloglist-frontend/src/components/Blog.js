import React, { useState } from 'react'

const Blog = ({ blog }) => {
	const [viewDetails, setViewDetails] = useState(false)

	const handleView = (event) => {
		event.preventDefault()
		console.log(blog)
		setViewDetails(!viewDetails)
	}

	const detailView = () => {
		return (
			<div>
				<div>
					{blog.url}
				</div>
				<div>
					likes {blog.likes}
				</div>
				<div>
					{blog.user.name}
				</div>
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