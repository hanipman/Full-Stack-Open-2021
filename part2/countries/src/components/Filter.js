import React from 'react'

const Filter = ({ filter, handleFilter }) => {
	return (
		<form>
			find countries <input value={filter} onChange={handleFilter} />
		</form>
	)
}

export default Filter;