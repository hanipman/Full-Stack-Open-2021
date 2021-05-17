import express, { Request, Response } from 'express';
import { BmiStats, calculateBmi } from './bmiCalculator';
export { BmiStats } from './bmiCalculator';
import { ExerciseStats, calculateExercises } from './exerciseCalculator';
export { ExerciseStats } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	try {
		const stats: BmiStats = req.query as unknown as BmiStats;
		if (!stats || !stats.height || !stats.weight) {
			throw new Error('parameters missing');
		}
		if (isNaN(stats.height) || isNaN(stats.weight)) {
			throw new Error('malformatted parameters');
		}
		res.send({
			height: stats.height,
			weight: stats.weight,
			bmi: calculateBmi(stats.height, stats.weight)
		});
	}
	catch (e: unknown) {
		if (e instanceof Error) {
			res.status(400).send({
				error: e.message
			});
		}
	}
});

app.post('/exercises', (req: Request, res: Response) => {
	try {
		const stats: ExerciseStats = req.body as ExerciseStats;
		if (!stats || !stats.daily_exercises || !stats.target) {
			throw new Error('parameters missing');
		}
		if (stats.daily_exercises.some(isNaN) || isNaN(stats.target)) {
			throw new Error('malformatted parameters');
		}
		return res.send(calculateExercises(stats.daily_exercises, stats.target));
	}
	catch (e: unknown) {
		if (e instanceof Error) {
			return res.status(400).send({
				error: e.message
			});
		}
		else {
			return res.status(400).send({
				error: 'Server error'
			});
		}
	}
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});