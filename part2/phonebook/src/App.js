import React, { useEffect, useState } from 'react'
import axios from 'axios'

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

const Persons = ({ persons, filter }) => {
	return (
		<ul>
			{persons.filter(person => 
				person.name.toLowerCase().includes(filter)).map((person, i) =>
					<li key={i}> {person.name} {person.number} </li>
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
		axios.get('http://localhost:3001/persons')
			.then(response => {
				setPersons(response.data)
			})
	}, [])

	const handleAdd = (event) => {
		event.preventDefault()
		if (persons.filter(person => person.name === newEntry.name).length > 0) {
			window.alert(`${newEntry.name} is already added to phonebook`)
		}
		else {
			axios.post('http://localhost:3001/persons', newEntry)
				.then(response => {
					setPersons(persons.concat({ name: response.data.name, number: response.data.number }))
				})
				.catch(error => {
					console.log(error)
				})
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
			<Persons persons={persons} filter={filter} />
		</div>
	)
}

export default App;
