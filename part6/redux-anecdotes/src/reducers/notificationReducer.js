const notificationReducer = (state = '', action) => {
	switch(action.type) {
		case 'VOTE_NOTIFICATION':
			return `Voted for anecdote '${action.content}'`
		case 'NEW_ANECDOTE_NOTIFICATION':
			return `Added new anecdote '${action.content}'`
		default:
			return state
	}
}

export const voteNotification = (content) => {
	return {
		type: 'VOTE_NOTIFICATION',
		content
	}
}

export const newAnecdoteNotification = (content) => {
	return {
		type: 'NEW_ANECDOTE_NOTIFICATION',
		content
	}
}

export default notificationReducer