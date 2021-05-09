import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'

import { initBlogs, likeBlog, deleteBlog } from '../reducers/blogReducer'

import Button from 'react-bootstrap/Button'
import CommentForm from './CommentForm'
import Spinner from 'react-bootstrap/Spinner'

const Blog = (props) => {
	const params = useParams()

	useEffect(() => {
		if (props.blogs.length === 0) {
			props.initBlogs()
		}
	}, [])

	let blog = props.blogs.find(b => params.id === b.id)

	useEffect(() => {
		blog = props.blogs.find(b => params.id === b.id)
	}, [props.blogs])

	const handleLike = (e) => {
		e.preventDefault()
		props.likeBlog(blog)
	}

	const handleDelete = (e) => {
		e.preventDefault()
		props.deleteBlog(blog.id)
	}

	if (props.blogs.length === 0) {
		return (
			<Spinner animation='border' role='status'>
				<span className='sr-only'>Loading...</span>
			</Spinner>
		)
	}
	return (
		<div>
			{blog ?
				<div>
					<h1>{blog.title}</h1>
					<a href={blog.url}>{blog.url}</a>
					<br />
					{blog.likes} likes
					<Button size='sm' style={{ marginLeft: '10px' }} onClick={handleLike}>Like</Button>
					<br />
					added by {blog.user.name}
					<br />
					<Button size='md' variant='danger' onClick={handleDelete}>Delete</Button>
					<h4 style={{ marginTop: '20px' }}>Comments</h4>
					<CommentForm />
					<br />
					<ul>
						{blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
					</ul>
				</div> :
				<Redirect to='/' />
			}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs
	}
}

const mapDispatchToProps = {
	initBlogs,
	likeBlog,
	deleteBlog
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default ConnectedBlog