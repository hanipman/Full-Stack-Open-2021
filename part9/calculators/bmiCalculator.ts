interface MultiplyValues {
	value1: number
	value2: number
}

export const parseBmiArgs = (args: Array<string>): MultiplyValues => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			value1: Number(args[2]),
			value2: Number(args[3])
		};
	}
	else {
		throw new Error('Provided values were not numbers!');
	}
};

export const calculateBmi = (height: number, weight: number) => {
	const bmi = weight / (height/100) ** 2;
	if (bmi > 0 && bmi <= 15) {
		return 'Very severely underweight';
	}
	else if (bmi > 15 && bmi <= 16) {
		return 'Severely underweight';
	}
	else if (bmi > 16 && bmi <= 18.5) {
		return 'Underweight';
	}
	else if (bmi > 18.5 && bmi <= 25) {
		return 'Normal (healthy weight)';
	}
	else if (bmi > 15 && bmi <= 30) {
		return 'Overweight';
	}
	else if (bmi > 30 && bmi <= 35) {
		return 'Obese Class I (Moderately obese)';
	}
	else if (bmi > 35 && bmi <= 40) {
		return 'Obese Class II (Severely obese)';
	}
	else if (bmi > 40) {
		return 'Obese class III (Very severely obese)';
	}
	return 'invalid bmi';
};

// try {
// 	const { value1, value2 } = parseBmiArgs(process.argv);
// 	console.log(calculateBmi(value1, value2));
// }
// catch (e) {
// 	console.log(`Error: ${e.message}`);
// }