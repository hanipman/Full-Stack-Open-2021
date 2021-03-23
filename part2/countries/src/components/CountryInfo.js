import React from 'react'

const CountryInfo = ({ countries }) => {
	if (countries.length === 1) {
		return (
			<div>
				<h1>{countries[0].name}</h1>
				<div>capital {countries[0].capital}<br />population {countries[0].population}</div>
				<h2>languages</h2>
				<ul>
					{countries[0].languages.map((language, i) => <li key={i}>{language.name}</li>)}
				</ul>
				<img src={countries[0].flag} alt="flag" width="200"/>
			</div>
		)
	}
	return (<div></div>)
}

export default CountryInfo;