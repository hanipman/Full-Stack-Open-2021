import axios from 'axios'
const baseUrl = '/api/blogs'

const getToken = () => {
	const auth = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
	return `bearer ${auth.token}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = (newBlog) => {
	const config = {
		headers: { Authorization: getToken() }
	}
	const request = axios.post(baseUrl, newBlog, config)
	return request.then(response => response.data)
}

const addComment = (id, comment) => {
	const config = {
		headers: { Authorization: getToken() }
	}
	const request = axios.post(`${baseUrl}/${id}/comments`, { content: comment }, config)
	return request.then(response => response.data)
}

const update = (newBlog, blog_id) => {
	const request = axios.put(`${baseUrl}/${blog_id}`, newBlog)
	return request.then(response => response.data)
}

const remove = (blog_id) => {
	const config = {
		headers: { Authorization: getToken() }
	}
	const request = axios.delete(`${baseUrl}/${blog_id}`, config)
	return request.then(response => response.data)
}

const blogsService = { getAll, create, addComment, update, remove }

export default blogsService