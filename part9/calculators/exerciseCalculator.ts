export interface ExerciseStats {
	daily_exercises: Array<number>
	target: number
}

const parseHoursArray = (args: Array<string>): ExerciseStats => {
	if (args.length < 12) throw new Error('Not enough arguments');
	if (args.length > 12) throw new Error('Too many arguments');

	const arr = args.slice(3);
	let temp: Array<number> = [];

	for (let i = 0; i < arr.length; i++) {
		if (isNaN(Number(arr[i]))) {
			throw new Error('Provided values were not numbers!');
		}
		temp = [...temp, Number(arr[i])];
	}
	if (isNaN(Number(args[2]))) {
		throw new Error('Provided values were not numbers!');
	}
	return {
		daily_exercises: temp,
		target: Number(args[2])
	};
};

export const calculateExercises = (daily_exercises: Array<number>, target: number) => {
	let trainingDays = 0;
	let sum = 0;
	for (let i = 0; i < daily_exercises.length; i++) {
		if (daily_exercises[i] !== 0) {
			trainingDays++;
			sum = sum + daily_exercises[i];
		}
	}
	const avg = sum/daily_exercises.length;
	let rating = 3;
	let description = '';
	if (avg < target * 0.5) {
		description = 'not very good';
		rating = 1;
	}
	else if (avg >= target * 0.5 && avg <= target * 1.5) {
		description = 'not too bad but could be better';
		rating = 2;
	}
	else {
		description = 'very good';
		rating = 3;
	}

	return {
		periodLength: daily_exercises.length,
		trainingDays,
		target,
		average: avg,
		success: avg >= target,
		rating: rating,
		ratingDescription: description
	};
};

try {
	const { daily_exercises, target } = parseHoursArray(process.argv);
	console.log(calculateExercises(daily_exercises, target));
}
catch (e) {
	if (e instanceof Error) {
		console.log(`Error: ${e.message}`);
	}
}