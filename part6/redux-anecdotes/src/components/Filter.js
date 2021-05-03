import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
	const handleFilterChange = (event) => {
		props.setFilter(event.target.value)
	}

	const style = {
		marginBottom: 10
	}

	return (
		<div style={style}>
			filter
			<input type='text' onChange={handleFilterChange}/>
		</div>
	)
}

const mapDispatchToProps = {
	setFilter,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter