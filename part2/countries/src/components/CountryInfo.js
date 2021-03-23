import React from 'react'

const CountryInfo = ({ country }) => {
	return (
		<div>
			<h1>{country.name}</h1>
			<div>capital {country.capital}<br />population {country.population}</div>
			<h2>languages</h2>
			<ul>
				{country.languages.map((language, i) => <li key={i}>{language.name}</li>)}
			</ul>
			<img src={country.flag} alt="flag" width="200"/>
		</div>
	)
}

export default CountryInfo;