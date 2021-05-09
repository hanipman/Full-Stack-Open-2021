import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import { login } from '../reducers/loginReducer'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const LoginForm = (props) => {
	const username = useField('username')
	const password = useField('password')

	const handleLogin = (e) => {
		e.preventDefault()
		props.login(username.value, password.value)
	}

	return (
		<div>
			<h2>Login</h2>
			<Form onSubmit={handleLogin}>
				<Form.Group>
					<Form.Label>Username</Form.Label>
					<Form.Control {...username} placeholder='username' />
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control {...password} placeholder='password' />
				</Form.Group>
				<Button id='login_button' type='submit'>Login</Button>
			</Form>
		</div>
	)
}

const mapDispatchToProps = {
	login,
}

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)
export default ConnectedLoginForm