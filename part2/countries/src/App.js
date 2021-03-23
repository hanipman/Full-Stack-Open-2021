import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Countries from './components/Countries.js'
import CountryInfo from './components/CountryInfo.js'
import Filter from './components/Filter.js'
import Weather from './components/Weather.js'

const App = () => {
	const [ countries, setCountries ] = useState([])
	const [ filter, setFilter ] = useState('')
	const [ filteredCountries, setFilteredCountries ] = useState([])
	// const [ flag, setFlag ] = useState(false)

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				setCountries(response.data)
			})
	}, [])

	const handleFilter = (event) => {
		setFilter(event.target.value)
		setFilteredCountries(countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase())))
	}

	return (
		<div>
			<Filter filter={filter} handleFilter={handleFilter} />
			<Countries countries={filteredCountries} />
			{filteredCountries.length === 1 ? 
				<div>
					<CountryInfo country={filteredCountries[0]}/>
					<Weather country={filteredCountries[0]} />
				</div>
					: <div />}
		</div>
	);
}

export default App;
