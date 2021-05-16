interface MultiplyValues {
	value1: number
	value2: number
}

const parseArguments = (args: Array<number>): MultiplyValues => {
	if (args.length < 4) throw new Error('Not enough arguments')
	if (args.length > 4) throw new Error('Too many arguments')

	return {
		value1: args[2],
		value2: args[3]
	}
}

const calculateBmi = (height: number, weight: number) => {
	const bmi = weight / (height/100) ** 2
	if (bmi > 0 && bmi <= 15) {
		console.log('Very severely underweight')
	}
	else if (bmi > 15 && bmi <= 16) {
		console.log('Severely underweight')
	}
	else if (bmi > 16 && bmi <= 18.5) {
		console.log('Underweight')
	}
	else if (bmi > 18.5 && bmi <= 25) {
		console.log('Normal (healthy weight)')
	}
	else if (bmi > 15 && bmi <= 30) {
		console.log('Overweight')
	}
	else if (bmi > 30 && bmi <= 35) {
		console.log('Obese Class I (Moderately obese)')
	}
	else if (bmi > 35 && bmi <= 40) {
		console.log('Obese Class II (Severely obese)')
	}
	else if (bmi > 40) {
		console.log('Obese class III (Very severely obese)')
	}
}

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])
try {
	console.log(a, b)
	calculateBmi(a, b)
}
catch (e) {
	console.log(`Error: ${e.message}`)
}