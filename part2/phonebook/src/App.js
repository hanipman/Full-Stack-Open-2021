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
				person.name.toLowerCase().includes(filter.toLowerCase())).map((person, i) =>
					<div key={i} >
						<li key={i}> {person.name} {person.number} <button onClick={event => handleDelete(event, person.id, person.name)}>Delete</button></li>
					</div>
			)}
		</ul>
	)
}

const Notification = ({ notif, error }) => {
	if (notif === null) {
		return null
	}
	return (
		<div className={error ? "error" : "notif"}>
			{notif}
		</div>
	)
}

const App = () => {
	const [ persons, setPersons ] = useState([]) 
	const [ newEntry, setEntry ] = useState({
		name: '',
		number: ''
	})
	const [ filter, setFilter ] = useState('')
	const [ notif, setNotif ] = useState(null)
	const [ error, setError ] = useState(false)
	
	useEffect(() => {
		personService.getAll().then(x => setPersons(x))
			.catch(error => {
				setNotif(`Failed to get phonebook, check that the server is running.` )
				setError(true)
				setTimeout(() => {
					setNotif(null)
					setError(false)
				}, 5000)
			})
	}, [])

	const handleAdd = (event) => {
		event.preventDefault()
		const filtered_list = persons.filter(person => person.name === newEntry.name)
		if (filtered_list.length > 0) {
			if (window.confirm(`${newEntry.name} is already added to phonebook, replace the old number with a new one?`)) {
				personService.update(filtered_list[0].id, newEntry)
					.then(x => {
						const copy = [...persons]
						const index = copy.findIndex(x => x.id === filtered_list[0].id)
						copy[index].number = newEntry.number
						setPersons(copy)
						setNotif(`Updated ${newEntry.name}`)
						setTimeout(() => {
							setNotif(null)
						}, 5000)
					})
					.catch(error => {
						setNotif(`Unable to update number of ${newEntry.name}.`)
						setError(true)
						setTimeout(() => {
							setNotif(null)
							setError(false)
						}, 5000)
					})
			}
		}
		else {
			personService.create(newEntry)
				.then(x => {
					setPersons(persons.concat({ name: x.name, number: x.number, id: x.id}))
					setNotif(`Created entry for ${x.name}`)
					setTimeout(() => {
						setNotif(null)
					}, 5000)
				})
				.catch(error => {
					setNotif(`Unable to create new entry for ${newEntry.name}`)
					setError(true)
					setTimeout(() => {
						setNotif(null)
						setError(false)
					}, 5000)
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

	const handleDelete = (event, id, name) => {
		event.preventDefault()
		if (window.confirm(`Delete ${name}?`)) {
			personService.deletePerson(id)
				.then(() => {
					setPersons(persons.filter(person => person.id !== id))
					setNotif(`Deleted ${name}`)
					setTimeout(() => {
						setNotif(null)
					}, 5000)
				})
				.catch(error => {
					setNotif(`Unable to delete entry for ${name}`)
					setError(true)
					setTimeout(() => {
						setNotif(null)
						setError(false)
					}, 5000)
				})
		}
	}

	return (
		<div>
		  	<h2>Phonebook</h2>
			<Notification notif={notif} error={error} />
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
