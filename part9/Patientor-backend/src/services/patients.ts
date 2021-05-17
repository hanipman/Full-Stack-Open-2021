import patientData from '../../data/patients';
import { PatientEntry } from '../types';

const patients: Array<PatientEntry> = patientData;

const getEntries = (): Array<PatientEntry> => {
	return patients;
};

export default {
	getEntries
};