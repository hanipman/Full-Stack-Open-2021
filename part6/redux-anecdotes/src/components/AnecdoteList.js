import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(state => {
		return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
	})
	const dispatch = useDispatch()

	const vote = (anecdote) => {
		console.log('vote', anecdote.id)
		dispatch(incrementVote(anecdote))
		dispatch(setNotification(`Voted for anecdote '${anecdote.content}'`, 10))
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
							<button onClick={() => vote(anecdote)}>vote</button>
						</div>
					</div>
				)
			
			})}
		</div>
	)
}

export default AnecdoteList