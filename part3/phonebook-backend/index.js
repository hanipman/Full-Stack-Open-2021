const cors = require('cors')
const express = require('express')
const { Mongoose } = require('mongoose')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan((tokens, request, response) => {
	return [
		tokens.method(request, response),
		tokens.url(request, response),
		tokens.status(request, response),
		tokens.res(request, response, 'content-length'), '-',
		tokens['response-time'](request, response), 'ms',
		JSON.stringify(request.body)
	].join(' ')
}))

// let persons = [
// 	{ 
// 		"name": "Arto Hellas", 
// 		"number": "040-123456",
// 		"id": 1
// 	},
// 	{
// 		"name": "Ada Lovelace", 
// 		"number": "39-44-5323523",
// 		"id": 2
// 	},
// 	{ 
// 		"name": "Dan Abramov", 
// 		"number": "12-43-234345",
// 		"id": 3
// 	},
// 	{ 
// 		"name": "Mary Poppendieck", 
// 		"number": "39-23-6423122",
// 		"id": 4
// 	}
// ]

app.get('/info', (request, response, next) => {
	const date = new Date().toString()
	Person.find({}).then(result => {
		if (result) {
			response.send(`
				<div>Phonebook has info for ${result.length} people</div>
				<div>${date}</div>
			`)
		}
		else {
			response.status(404).end()
		}
	})
	.catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
	Person.find({}).then(result => {
		response.json(result)
	})
	.catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id).then(result => {
		if (result) {
			response.json(result)
		}
		else {
			response.status(404).end()
		}
	})
	.catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
	const entry = request.body
	if (!entry.number || !entry.name || !entry) {
		response.status(400).send({ error: 'missing name or number' })
		return
	}
	// if (Person.find({ name: person.name }).then(result => {
	// 	response.status(409)
	// 	response.send({ error: 'name must be unique' })
	// 	return
	// }
	// person.id = Math.floor(Math.random() * Math.floor(100))
	// persons = persons.concat(person)
	const person = new Person({ name: entry.name, number: entry.number })
	person.save().then(result => {
		console.log(`added ${person.name} number ${person.number} to phonebook`)
		response.json(entry)
	})
	.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id).then(result => {
		response.status(204).end()
	})
	.catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
	console.log(error.message)
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformed id' })
	}
	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})