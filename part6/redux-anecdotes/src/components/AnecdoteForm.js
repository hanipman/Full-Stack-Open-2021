import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newAnecdoteNotification, hideNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const getId = () => (100000 * Math.random()).toFixed(0)

	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		const id = getId()
		event.target.anecdote.value = ''
		anecdotesService.create({ content, id, votes: 0 })
			.then(response => {
				console.log(response)
			})
		dispatch(createAnecdote(content, id))
		dispatch(newAnecdoteNotification(content))
		setTimeout(() => {
			dispatch(hideNotification())
		}, 5000)
	}
	
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div><input name='anecdote' /></div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm