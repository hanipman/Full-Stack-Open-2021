import express from 'express'
const app = express()
import { parseBmiArgs, calculateBmi } from './bmiCalculator'

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
	let args: Array<string> = ['', '', String(req.query.height), String(req.query.weight)]
	try {
		const { value1, value2 } = parseBmiArgs(args)
		res.send({
			height: value1,
			weight: value2,
			bmi: calculateBmi(value1, value2)
		})
	}
	catch (e) {
		res.status(400).send({
			error: 'malformatted parameters'
		})
	}
})

const PORT = 3003

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})