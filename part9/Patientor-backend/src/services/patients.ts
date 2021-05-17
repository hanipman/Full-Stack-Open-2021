import patientData from '../../data/patients';
import { SecurePatient, Patient } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
	return patients;
};

const getSecureEntries = (): Array<SecurePatient> => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
}

export default {
	getEntries,
	getSecureEntries
};