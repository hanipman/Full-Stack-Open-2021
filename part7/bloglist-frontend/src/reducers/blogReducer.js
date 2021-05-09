import blogsService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
	// console.log('state now: ', state)
	// console.log('action', action)

	switch(action.type) {
		case 'INIT_BLOGS':
			return action.initialState
		case 'NEW_BLOG':
			return [...state, action.data]
		case 'ADD_COMMENT': {
			const current_blog = state.find(blog => blog.id === action.id)
			const updated_blog = {
				...current_blog,
				comments: current_blog.comments.concat(action.comment)
			}
			const new_state = state.map(blog => blog.id !== action.id ? blog: updated_blog)
			return new_state
		}
		case 'LIKE_BLOG': {
			const updated_blog = {
				...action.blog,
				likes: action.blog.likes + 1
			}
			const new_state = state.map(blog => blog.id !== action.blog.id ? blog : updated_blog)
			return new_state
		}
		case 'DELETE_BLOG': {
			const new_state = state.filter(blog => blog.id !== action.id)
			return new_state
		}
		default:
			return state
	}
}

export const createBlog = (blogObject) => {
	return async dispatch => {
		try {
			const newBlog = await blogsService.create(blogObject)
			dispatch({
				type: 'NEW_BLOG',
				data: newBlog
			})
			dispatch(setNotification(`Created blog with id ${newBlog.id}`, 5))
		}
		catch (exception) {
			dispatch(setNotification(`${exception}`, 5))
		}
	}
}

export const addComment = (id, comment) => {
	return async dispatch => {
		try {
			await blogsService.addComment(id, comment)
			dispatch({
				type: 'ADD_COMMENT',
				comment,
				id
			})
			dispatch(setNotification(`Added comment ${comment} to blog with id ${id}`, 5))
		}
		catch (exception) {
			dispatch(setNotification(`${exception}`, 5))
		}
	}
}

export const initBlogs = () => {
	return async dispatch => {
		const initialState = await blogsService.getAll()
		dispatch({
			type: 'INIT_BLOGS',
			initialState
		})
	}
}

export const likeBlog = (blog) => {
	return async dispatch => {
		const updated_blog = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes +  1,
			user: blog.user.id
		}
		await blogsService.update(updated_blog, blog.id)
		dispatch({
			type: 'LIKE_BLOG',
			blog
		})
	}
}

export const deleteBlog = (id) => {
	return async dispatch => {
		try {
			await blogsService.remove(id)
			dispatch({
				type: 'DELETE_BLOG',
				id
			})
			dispatch(setNotification(`Deleted blog with id ${id}`, 5))
		}
		catch (exception) {
			dispatch(setNotification(`${exception}`, 5))
		}
	}
}

export default blogReducer