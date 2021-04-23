import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = (newBlog) => {
	const config = {
		headers: { Authorization: token }
	}
	const request = axios.post(baseUrl, newBlog, config)
	return request.then(response => response.data)
}

const update = (newBlog, blog_id) => {
	const request = axios.put(`${baseUrl}/${blog_id}`, newBlog)
	return request.then(response => response.data)
}

const remove = (blog_id) => {
	const config = {
		headers: { Authorization: token }
	}
	const request = axios.delete(`${baseUrl}/${blog_id}`, config)
	return request.then(response => response.data)
}

const blogsService = { getAll, create, update, remove, setToken }

export default blogsService