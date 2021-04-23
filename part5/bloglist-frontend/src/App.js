import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogsService from './services/blogs'
import loginService from './services/login'

const Notification = ({ notif, error }) => {
	if (notif === null) {
		return null
	}
	return (
		<div className={error ? 'error' : 'notif'}>
			{notif}
		</div>
	)
}

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [notif, setNotif] = useState(null)
	const [error, setError] = useState(false)

	const refreshBlogList = () => {
		blogsService.getAll().then(blogs => {
			setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
		})
	}

	useEffect(() => {
		refreshBlogList()
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		
		try {
			const user = await loginService.login({
				username, password
			})
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogsService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		}
		catch (exception) {
			setNotif('wrong username or password')
			setError(true)
			setTimeout(() => {
				setNotif(null)
				setError(false)
			}, 5000)
		}
	}

	const handleLogout = (event) => {
		event.preventDefault()

		setUser(null)
		window.localStorage.removeItem('loggedBlogappUser')
	}

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility()
		blogsService.create(blogObject)
			.then(response => {
				refreshBlogList()
				setNotif(`a new blog ${blogObject.title} by ${blogObject.author} added`)
				setTimeout(() => {
					setNotif(null)
				}, 5000)
			})
			.catch(error => {
				if (!error.response) {
					setNotif('Could not connect to server')
				}
				else {
					setNotif(error.response.data.error)
				}
				setError(true)
				setTimeout(() => {
					setNotif(null)
					setError(false)
				}, 5000)
			})
	}

	const loginForm = () => {
		return (
			<div>
				<h2>log in to application</h2>
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							type='text'
							value={username}
							name='Username'
							onChange={({ target }) => setUsername(target.value)}  
						/>
					</div>
					<div>
						password
						<input
							type='text'
							value={password}
							name='Password'
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button type='submit'>login</button>
				</form>
			</div>
		)
	}

	const blogFormRef = useRef()

	const blogView = () => {
		return (
			<div>
				<div>
					<h2>blogs</h2>
					{user.name} logged in
					<button type='button' onClick={handleLogout}>logout</button>
					<br/>
					<Togglable buttonLabel='create new blog' ref={blogFormRef}>
						<BlogForm createBlog={addBlog} />
					</Togglable>
					{blogs.map(blog => <Blog key={blog.id} blog={blog} update={refreshBlogList} username={user.username} />)}
				</div>
			</div>
		)
	}

	return (
		<div>
			<Notification notif={notif} error={error} />
			{user === null ? loginForm() : blogView()}
		</div>
	)
}

export default App