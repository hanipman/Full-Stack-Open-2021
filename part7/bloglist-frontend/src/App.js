import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import PrivateRoute from './components/PrivateRoute'
import User from './components/User'

import { initBlogs } from './reducers/blogReducer'
import { checkLogin, logout } from './reducers/loginReducer'
import { initUsers } from './reducers/userReducer'

import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'

const App = (props) => {
	let history = useHistory()

	useEffect(() => {
		if (props.auth === null) {
			const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
			if (user !== null) {
				props.checkLogin(user)
			}
		}
	}, [])

	const handleLogout = (event) => {
		event.preventDefault()

		props.logout()
		window.localStorage.removeItem('loggedBlogappUser')
		history.push('/login')
	}

	const navBar = () => {
		return (
			<Navbar bg='light' expand='lg' fixed='top'>
				<Navbar.Brand>
					Blogs App
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav>
						<Nav.Link as={Link} to='/'>Blogs</Nav.Link>
						<Nav.Link as={Link} to='/users'>Users</Nav.Link>
					</Nav>
					<Nav className='ml-auto'>
						{props.auth !== null ?
							<div>
								<Navbar.Text>Signed in as: {props.auth.username}</Navbar.Text>
								<Button variant='light' onClick={handleLogout}>Logout</Button>
							</div> :
							<Nav.Link href='/login'>Login</Nav.Link>
						}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}

	const blogView = () => {
		useEffect(() => {
			if (props.blogs.length === 0) {
				props.initBlogs()
			}
		}, [])
		return (
			<div>
				<h2>blogs</h2>
				<hr />
				<br />
				<Togglable buttonLabel='create new blog'>
					<BlogForm />
				</Togglable>
				<br />
				{props.blogs.length === 0 ?
					<Spinner>
						<span className='sr-only'>Loading...</span>
					</Spinner> :
					<ListGroup as='ul'>
						{props.blogs.map(blog => <ListGroup.Item key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ListGroup.Item>)}
					</ListGroup>
				}
			</div>
		)
	}

	const renderRow = (id, name, length) => {
		return (
			<tr key={id}>
				<td><Link to={`/users/${id}`}>{name}</Link></td>
				<td>{length}</td>
			</tr>
		)
	}

	const userView = () => {
		useEffect(() => {
			if (props.users.length === 0) {
				props.initUsers()
			}
		}, [])
		return (
			<div>
				<h2>Users</h2>
				<br />
				{props.users.length === 0 ?
					<Spinner>
						<span className='sr-only'>Loading...</span>
					</Spinner> :
					<Table bordered hover size='sm'>
						<thead>
							<tr>
								<th>user</th>
								<th>blogs added</th>
							</tr>
						</thead>
						<tbody>
							{props.users.map(user => renderRow(user.id, user.name, user.blogs.length))}
						</tbody>
					</Table>
				}
			</div>
		)
	}

	return (
		<div>
			{navBar()}
			<div style={{ padding: '5% 5%' }}>
				<Notification />
				<Switch>
					<PrivateRoute exact path='/' component={blogView} />
					<Route exact path='/login'>
						{props.auth ? <Redirect to='/'/> : <LoginForm />}
					</Route>
					<PrivateRoute exact path='/blogs/:id' component={Blog} />
					<PrivateRoute exact path='/users' component={userView} />
					<PrivateRoute exact path='/users/:id' component={User} />
				</Switch>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		blogs: state.blogs,
		users: state.users
	}
}

const mapDispatchToProps = {
	checkLogin,
	logout,
	initBlogs,
	initUsers
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp