const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
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

let persons = [
	{ 
		"name": "Arto Hellas", 
		"number": "040-123456",
		"id": 1
	},
	{
		"name": "Ada Lovelace", 
		"number": "39-44-5323523",
		"id": 2
	},
	{ 
		"name": "Dan Abramov", 
		"number": "12-43-234345",
		"id": 3
	},
	{ 
		"name": "Mary Poppendieck", 
		"number": "39-23-6423122",
		"id": 4
	}
]

app.get('/info', (request, response) => {
	const date = new Date().toString()
	response.send(`
		<div>Phonebook has info for ${persons.length} people</div>
		<div>${date}</div>
	`)
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)
	if (person) {
		response.json(person)
	}
	else {
		response.status(404).end()
	}
})

app.post('/api/persons/', (request, response) => {
	console.log(request.body)
	const person = request.body
	if (!person.number || !person.name || !person) {
		response.status(400)
		response.send({ error: 'missing name or number' })
		return
	}
	if (persons.find(x => x.name === person.name)) {
		response.status(409)
		response.send({ error: 'name must be unique' })
		return
	}
	person.id = Math.floor(Math.random() * Math.floor(100))
	persons = persons.concat(person)
	response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)
	if (person) {
		persons = persons.filter(person => person.id !== id)
	}
	response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})