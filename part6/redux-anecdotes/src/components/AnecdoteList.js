import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { voteNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(state => {
		return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
	})
	const dispatch = useDispatch()

	const vote = (id, content) => {
		console.log('vote', id)
		dispatch(incrementVote(id))
		dispatch(voteNotification(content))
		setTimeout(() => {
			dispatch(hideNotification())
		}, 5000)
	}

	return (
		<div>
			{anecdotes.map(anecdote => {
				return (
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
						</div>
					</div>
				)
			
			})}
		</div>
	)
}

export default AnecdoteList