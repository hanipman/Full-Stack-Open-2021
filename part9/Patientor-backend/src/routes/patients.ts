import express from 'express';
import patientService from '../services/patients';

const router = express.Router();

router.get('/', (_req, res) => {
	const entries = patientService.getSecureEntries();
	res.send(entries);
});

export default router;