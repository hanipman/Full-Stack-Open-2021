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
	console.log(newBlog.likes)
	const request = axios.put(`${baseUrl}/${blog_id}`, newBlog)
	return request.then(response => response.data)
}

const blogsService = { getAll, create, update, setToken }

export default blogsService