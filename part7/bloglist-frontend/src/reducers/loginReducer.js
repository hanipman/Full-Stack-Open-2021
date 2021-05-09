import { setNotification } from '../reducers/notificationReducer'
// import blogsService from '../services/blogs'
import loginService from '../services/login'

const loginReducer = (state = null, action) => {
	switch(action.type) {
		case 'LOGIN':
			return action.user
		case 'CHECK_LOGIN':
			return action.user
		case 'LOGOUT':
			return null
		default:
			return state
	}
}

export const login = (username, password) => {
	return async dispatch => {
		try {
			const user = await loginService.login({
				username, password
			})
			console.log(user)
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			// blogsService.setToken(user.token)
			dispatch(setNotification(`Logged in as ${username}`, 5))
			dispatch({
				type: 'LOGIN',
				user
			})
		}
		catch (exception) {
			console.log(exception)
			dispatch(setNotification('Wrong username or password', 5))
		}
	}
}

export const checkLogin = (user) => {
	return dispatch => {
		dispatch({
			type: 'CHECK_LOGIN',
			user
		})
	}
}

export const logout = () => {
	return dispatch => {
		dispatch({
			type: 'LOGOUT',
		})
	}
}

export default loginReducer