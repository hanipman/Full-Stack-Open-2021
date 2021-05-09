import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useField } from '../hooks/index'

import { addComment } from '../reducers/blogReducer'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CommentForm = () => {
	const comment = useField('comment')
	const params = useParams()
	const dispatch = useDispatch()

	const handleComment = (e) => {
		e.preventDefault()
		dispatch(addComment(params.id, comment.value))
		comment.onReset()
	}

	return (
		<div>
			<Form onSubmit={handleComment}>
				<Form.Group>
					<Form.Control {...comment} placeholder='comment here...' as='textarea' rows={3}/>
				</Form.Group>
				<Button id='comment_button' type='submit' size='sm'>Add Comment</Button>
			</Form>
		</div>
	)
}

export default CommentForm