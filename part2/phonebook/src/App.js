import React, { useState } from 'react'

const App = () => {
	const [ persons, setPersons ] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
    	{ name: 'Ada Lovelace', number: '39-44-5323523' },
    	{ name: 'Dan Abramov', number: '12-43-234345' },
    	{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	]) 
	const [ newEntry, setEntry ] = useState({
		name: '',
		number: ''
	})
	const [ filter, setFilter ] = useState('')
	
	const handleAdd = (event) => {
		event.preventDefault()
		if (persons.filter(person => person.name === newEntry.name).length > 0) {
			window.alert(`${newEntry.name} is already added to phonebook`)
		}
		else {
			setPersons(persons.concat({ name: newEntry.name, number: newEntry.number }))
		}
	}

	const handleFilter = (event) => {
		setFilter(event.target.value)
	}

	const handleNameChange = (event) => {
		setEntry({
			...newEntry,
			name: event.target.value
		})
	}

	const handleNumberChange = (event) => {
		setEntry({
			...newEntry,
			number: event.target.value
		})
	}

	return (
		<div>
		  	<h2>Phonebook</h2>
			<form>
				filter shown with<input value={filter} onChange={handleFilter} />
			</form>
			<h2>add a new</h2>
		  	<form onSubmit={handleAdd} >
				<div>
			  		name: <input value={newEntry.name} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newEntry.number} onChange={handleNumberChange} /> 
				</div>
				<div>
			  		<button type="submit">add</button>
				</div>
		  	</form>
		  	<h2>Numbers</h2>
		  	<ul>
				{persons.filter(person => 
					person.name.toLowerCase().includes(filter)).map((person, i) =>
						<li key={i}> {person.name} {person.number} </li>
				)}
			</ul>
		</div>
	)
}

export default App;
