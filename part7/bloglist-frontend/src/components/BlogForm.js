import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'

import { createBlog } from '../reducers/blogReducer'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const BlogForm = (props) => {
	const title = useField('title')
	const author = useField('author')
	const url = useField('url')

	const addBlog = (e) => {
		e.preventDefault()
		console.log(title, author, url)
		props.createBlog({
			title: title.value,
			author: author.value,
			url: url.value
		})
	}

	const handleReset = () => {
		title.onReset()
		author.onReset()
		url.onReset()
	}

	return (
		<div>
			<h2>create new</h2>
			<Form onSubmit={addBlog} onReset={handleReset}>
				<Form.Group>
					<Form.Label>Title</Form.Label>
					<Form.Control {...title} placeholder='Enter Title' />
				</Form.Group>
				<Form.Group>
					<Form.Label>Author</Form.Label>
					<Form.Control {...author} placeholder='Enter Author' />
				</Form.Group>
				<Form.Group>
					<Form.Label>Url</Form.Label>
					<Form.Control {...url} placeholder='Enter Url' />
				</Form.Group>
				<Button id='create_button' type='submit'>Create</Button>
				<Button id='reset_button' type='reset'>Reset</Button>
			</Form>
		</div>
	)
}

const mapDispatchToProps = {
	createBlog
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)
export default ConnectedBlogForm