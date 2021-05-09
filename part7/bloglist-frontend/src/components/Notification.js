import React from 'react'
import { connect } from 'react-redux'

import Alert from 'react-bootstrap/Alert'

const Notification = (props) => {
	if (props.notification !== '') {
		return (
			<Alert variant='secondary'>
				{props.notification}
			</Alert>
		)
	}
	else {
		return null
	}
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification