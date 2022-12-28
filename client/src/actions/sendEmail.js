import axios from 'axios';
import { setAlert } from './alert';
import {
	EMAILSENT,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Attachment Get by Id
export const sendEmailFunc = (EmailAdress, {
	emailType }) => async dispatch => {

	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ 
		//emailType
		EmailAdress
	});
	
	try {

		//const res = await axios.post('/api/sendEmail/' + EmailAdress, body ,config);
		const res = await axios.post('/api/auth/forgot-password', body ,config);
		//console.log(res,"emailcheck");

		if (emailType == "forgotpassword")
		dispatch(setAlert("Email Sent Successfully", 'success'));

	} catch (err) {
		
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}
	}
}