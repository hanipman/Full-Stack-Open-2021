interface exerciseStats {
	dailyHours: Array<number>
	target: number
}

const parseHoursArray = (args: Array<string>): exerciseStats => {
	if (args.length < 12) throw new Error('Not enough arguments')
	if (args.length > 12) throw new Error('Too many arguments')

	const arr = args.slice(3)
	let temp: Array<number> = []

	for (let i = 0; i < arr.length; i++) {
		if (isNaN(Number(arr[i]))) {
			throw new Error('Provided values were not numbers!')
		}
		temp = [...temp, Number(arr[i])]
	}
	if (isNaN(Number(args[2]))) {
		throw new Error('Provided values were not numbers!')
	}
	return {
		dailyHours: temp,
		target: Number(args[2])
	}
}

const calculateExercises = (dailyHours: Array<number>, target: number) => {
	let trainingDays = 0
	let sum = 0
	for (let i = 0; i < dailyHours.length; i++) {
		if (dailyHours[i] !== 0) {
			trainingDays++
			sum = sum + dailyHours[i]
		}
	}
	const avg = sum/dailyHours.length
	let rating = 3
	let description = ''
	if (avg < target * 0.5) {
		description = 'not very good'
		rating = 1
	}
	else if (avg >= target * 0.5 && avg <= target * 1.5) {
		description = 'not too bad but could be better'
		rating = 2
	}
	else {
		description = 'very good'
		rating = 3
	}

	return {
		periodLength: dailyHours.length,
		trainingDays,
		target,
		average: avg,
		success: avg >= target,
		rating: rating,
		ratingDescription: description
	}
}

try {
	const { dailyHours, target } = parseHoursArray(process.argv)
	console.log(calculateExercises(dailyHours, target))
}
catch (e) {
	console.log(`Error: ${e.message}`)
}