import React from 'react'

const Countries = ({ countries }) => {
	if (countries.length > 10 || countries.length === 0) {
		return (
			<div>Too many matches, specify another filter</div>
		)
	}
	else if (countries.length === 1) {
		return (<div/>)
	}
	else {
		return (
			<div>
				<ul>
					{countries.map((country, i) => <li key={i}>{country.name}</li>)}
				</ul>
			</div>
		)
	}
}

export default Countries;