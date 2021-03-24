import React, { useEffect, useState } from 'react'

import personService from './services/persons.js'

const Filter = ({ filter, handleFilter }) => {
	return (
		<form>
			filter shown with<input value={filter} onChange={handleFilter} />
		</form>
	)
}

const PersonForm = ({ handleAdd, handleNameChange, handleNumberChange, name, number }) => {
	return (
		<form onSubmit={handleAdd}>
			<div>
				name: <input value={name} onChange={handleNameChange} />
			</div>
			<div>
				number: <input value={number} onChange={handleNumberChange} />
			</div>
			<button type="submit" >add</button>
		</form>
	)
}

const Persons = ({ persons, filter, handleDelete }) => {
	return (
		<ul>
			{persons.filter(person => 
				person.name.toLowerCase().includes(filter)).map((person, i) =>
					<div key={i} >
						<li key={i}> {person.name} {person.number} <button onClick={event => handleDelete(event, person.id, person.name)}>Delete</button></li>
					</div>
			)}
		</ul>
	)
}

const App = () => {
	const [ persons, setPersons ] = useState([]) 
	const [ newEntry, setEntry ] = useState({
		name: '',
		number: ''
	})
	const [ filter, setFilter ] = useState('')
	
	useEffect(() => {
		personService.getAll().then(x => setPersons(x))
	}, [])

	const handleAdd = (event) => {
		event.preventDefault()
		if (persons.filter(person => person.name === newEntry.name).length > 0) {
			window.alert(`${newEntry.name} is already added to phonebook`)
		}
		else {
			personService.create(newEntry)
				.then(x => setPersons(persons.concat({ name: x.name, number: x.number })))
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

	const handleDelete = (event, id, name) => {
		event.preventDefault()
		if (window.confirm(`Delete ${name}?`)) {
			personService.deletePerson(id)
				.then(setPersons(persons.filter(person => person.id !== id)))
		}
	}

	return (
		<div>
		  	<h2>Phonebook</h2>
			<Filter filter={filter} handleFilter={handleFilter} />
			<h2>add a new</h2>
			<PersonForm 
				handleAdd={handleAdd} 
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				name={newEntry.name}
				number={newEntry.number}
			/>
		  	<h2>Numbers</h2>
			<Persons persons={persons} filter={filter} handleDelete={handleDelete} />
		</div>
	)
}

export default App;
