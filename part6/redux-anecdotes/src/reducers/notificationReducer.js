let timeoutId = null

const notificationReducer = (state = '', action) => {
	switch(action.type) {
		case 'SET_NOTIFICATION':
			return action.content
		case 'CLEAR_NOTIFICATION':
			return ''
		default:
			return state
	}
}

export const clearNotification = () => {
	return {
		type: 'CLEAR_NOTIFICATION'
	}
}

export const setNotification = (content, sec) => {
	return async dispatch => {
		clearTimeout(timeoutId)
		dispatch({
			type: 'SET_NOTIFICATION',
			content
		})
		timeoutId = setTimeout(() => {
			dispatch(clearNotification())
		}, sec * 1000)
	}
}

export default notificationReducer