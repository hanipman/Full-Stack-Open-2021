interface exerciseStats {
	dailyHours: Array<number>
	target: number
}

const parseHoursArray = (args: Array<string>): exerciseStats => {
	if (args.length < 4) throw new Error('Not enough arguments')
	if (args.length > 4) throw new Error('Too many arguments')

	const str = args[2].replace(/[\[\]]/g, '')
	const arr = str.split(' ')
	let temp: Array<number> = []

	for (let i = 0; i < arr.length; i++) {
		if (isNaN(Number(arr[i]))) {
			throw new Error('Provided values were not numbers!')
		}
		temp = [...temp, Number(arr[i])]
	}
	if (isNaN(Number(args[3]))) {
		throw new Error('Provided values were not numbers!')
	}
	return {
		dailyHours: temp,
		target: Number(args[3])
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
	const avg = sum/7
	const rating = avg >= 2 ? 3 : Math.round(avg) + 1
	const description = (rating: number) => {
		switch(rating) {
			case 1:
				return 'not very good'
			case 2:
				return 'not too bad but could be better'
			case 3:
				return 'very good'
			default:
				return 'invalid rating'
		}
	}

	return {
		periodLength: 7,
		trainingDays,
		target,
		average: avg,
		success: trainingDays === 7,
		rating: rating,
		ratingDescription: description(rating)
	}
}

try {
	const { dailyHours, target } = parseHoursArray(process.argv)
	console.log(calculateExercises(dailyHours, target))
}
catch (e) {
	console.log(`Error: ${e.message}`)
}