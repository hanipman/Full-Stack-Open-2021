import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import Button from 'react-bootstrap/Button'

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<div style={visible ? { borderStyle: 'solid', borderRadius: '25px', padding: '10px', background: '#E8FBFF' } : null}>
			<div style={hideWhenVisible}>
				<Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<Button onClick={toggleVisibility}>Cancel</Button>
			</div>
		</div>
	)
})

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable