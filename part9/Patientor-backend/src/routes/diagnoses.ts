import express from 'express';
import diagnosesService from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
	const entries = diagnosesService.getEntries();
	res.send(entries);
});

export default router;