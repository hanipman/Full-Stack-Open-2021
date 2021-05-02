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
		dispatch({
			type: 'SET_NOTIFICATION',
			content
		})
		setTimeout(() => {
			dispatch(clearNotification())
		}, sec * 1000)
	}
}

export default notificationReducer