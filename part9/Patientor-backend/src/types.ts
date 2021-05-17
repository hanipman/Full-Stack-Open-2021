export type Gender = 'male' | 'female' | 'other';

export interface Diagnosis {
	code: string,
	name: string,
	latin?: string
}

export type SecurePatient = Omit<Patient, 'ssn'>;

export interface Patient {
	id: string,
	name: string,
	dateOfBirth?: string,
	ssn?: string,
	gender: Gender,
	occupation: string
}