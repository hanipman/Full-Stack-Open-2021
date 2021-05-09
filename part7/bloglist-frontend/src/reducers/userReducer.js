import usersService from '../services/users'

const userReducer = (state = [], action) => {
	switch(action.type) {
		case 'INIT_USERS':
			return action.initialState
		default:
			return state
	}
}

export const initUsers = () => {
	return async dispatch => {
		const initialState = await usersService.getAll()
		dispatch({
			type: 'INIT_USERS',
			initialState
		})
	}
}

export default userReducer