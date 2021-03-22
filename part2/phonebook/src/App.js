import React, { useState } from 'react'

const App = () => {
	const [ persons, setPersons ] = useState([
		{ name: 'Arto Hellas' }
	]) 
	const [ newName, setNewName ] = useState('')
	
	const handleAdd = (event) => {
		event.preventDefault()
		if (persons.filter(person => person.name === newName).length > 0) {
			window.alert(`${newName} is already added to phonebook`)
		}
		else {
			setPersons(persons.concat({ name: newName }))
		}
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	return (
		<div>
		  	<h2>Phonebook</h2>
		  	<form onSubmit={handleAdd} >
				<div>
			  		name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
			  		<button type="submit">add</button>
				</div>
		  	</form>
		  	<h2>Numbers</h2>
		  	<ul>
				{persons.map((person, i) =>
					<li key={i}> {person.name}</li>
				)}
			</ul>
		</div>
	)
}

export default App;
