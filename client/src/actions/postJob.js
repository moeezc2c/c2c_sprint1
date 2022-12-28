import axios from 'axios';
import { setAlert } from './alert';
import {
	POSTJOB_GET,
	COMPLEXITY_GET,
	EXPECTEDDUARATION_GET,
	PAYMENTTYPE_GET,
	SKILLS_GET,
	JOBDETAIL_GET
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Complexity Get
export const complexityGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/complexity');

		if (res.data == null)
			res.data = [];

		dispatch({
			type: COMPLEXITY_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Complexity Get by Id
export const complexityGetbyId = (id) => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/complexity/' + id);

		if (res.data == null)
			res.data = [];

		dispatch({
			type: COMPLEXITY_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// expectedDurationGetbyId
export const expectedDurationGetbyId = (id) => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/expectedDuration/' + id);

		if (res.data == null)
			res.data = [];

		dispatch({
			type: EXPECTEDDUARATION_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

export const paymentTypeGetbyId = (id) => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/paymentType/' + id);

		if (res.data == null)
			res.data = [];

		dispatch({
			type: PAYMENTTYPE_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

export const skillsGetbyId = (id) => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/skill/' + id);

		if (res.data == null)
			res.data = [];

		dispatch({
			type: SKILLS_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Expected Duration Get
export const expectedDurationGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/expectedDuration');

		if (res.data == null)
			res.data = [];

		dispatch({
			type: EXPECTEDDUARATION_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Payment Type Get
export const paymentTypeGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/paymentType');

		if (res.data == null)
			res.data = [];

		dispatch({
			type: PAYMENTTYPE_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Post Job Get
export const postJobGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/job');

		if (res.data == null)
			res.data = [];

		dispatch({
			type: POSTJOB_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}


// Post Job Get all
export const postJobGetAll = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/job/all');

		if (res.data == null)
			res.data = [];

		dispatch({
			type: POSTJOB_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}


// Post Job Get by Id
export const postJobGetById = (id) => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/job/'+ id);

		if (res.data == null)
			res.data = [];

		dispatch({
			type: JOBDETAIL_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'));
			dispatch({
				type: JOBDETAIL_GET,
				payload: errors
			});
		}
	}
}

// Add Post Job
export const addPostJob = ({ expected_duration_id,
        complexity_id,
        description,
        main_skill_id,
        payment_type_id,
        payment_amount,
        headline,
		attachments,
	location }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ expected_duration_id,
        complexity_id,
        description,
        main_skill_id,
        payment_type_id,
        payment_amount,
        headline,
        location,attachments });

	try {
		const res = await axios.post('/api/job', body, config);
		
		dispatch(postJobGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}

// Delete Job 
export const deleteJob = (id) => async dispatch => {

try {
	const res = await axios.delete('/api/job/' + id);

	dispatch(setAlert("Job Delete Successfully", 'success'));
	dispatch(postJobGet());

} catch (err) {

	const errors = err.response;

	if (errors) {
		errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
	}

}

}


