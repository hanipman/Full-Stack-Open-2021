import React, { useState } from 'react'

import CountryInfo from './CountryInfo'

const SpecificCountry = ({ country }) => {
	const [ flag, setFlag ] = useState(false)

	const handleShow = () => {
		setFlag(!flag)
	}

	if (!flag) {
		return (
			<div>
				{country.name} <button onClick={handleShow}>show</button>
			</div>
		)
	}
	else {
		return (
			<div>
				{country.name} <button onClick={handleShow}>show</button>
				<CountryInfo country={country} />
			</div>
		)
	}
}

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
				{countries.map((country, i) =>
					<SpecificCountry key={i} country={country} />
				)}
			</div>
		)
	}
}

export default Countries;