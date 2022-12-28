import axios from 'axios';
import { setAlert } from './alert';
import {
	HIREMANAGER_GET,
	SKILLS_GET
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Skills Get
export const skillsGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/skill');

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


// hireManager Get
export const hireManagerGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/hireManager/me'); //setitem or get item
		localStorage.setItem('hireManager', JSON.stringify(res));

		if (res.data == null)
			res.data = [];

		dispatch({
			type: HIREMANAGER_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Add hireManager Value
export const addhireManager = ({ company_id,
            overview,
            skills_level_id,
            experience_level,
            location }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ company_id,
            overview,
            skills_level_id,
            experience_level,
            location, });

	try {
		const res = await axios.post('/api/hireManager', body, config);
		
		dispatch(hireManagerGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}



