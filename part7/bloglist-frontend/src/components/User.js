import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { initUsers } from '../reducers/userReducer'

import Spinner from 'react-bootstrap/Spinner'

const User = (props) => {
	const params = useParams()

	useEffect(() => {
		if (props.users.length === 0) {
			props.initUsers()
		}
	}, [])

	let user = props.users.find(u => params.id === u.id)

	useEffect(() => {
		user = props.users.find(b => params.id === b.id)
	}, [props.blogs])

	if (props.users.length === 0) {
		return (
			<Spinner animation='border' role='status'>
				<span className='sr-only'>Loading...</span>
			</Spinner>
		)
	}
	return (
		<div>
			<h1>{user.name}</h1>
			<hr />
			<br />
			<h2>Added Blogs</h2>
			<br />
			<ul>
				{user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
			</ul>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		users: state.users
	}
}

const mapDispatchToProps = {
	initUsers
}

const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User)
export default ConnectedUser