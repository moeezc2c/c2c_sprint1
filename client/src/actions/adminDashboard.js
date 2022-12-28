import { PENDING_JOBS_GET_SUCCESS } from "./types";
import axios from 'axios';
import { setAlert } from "./alert";


export const getPendingJobs = () => async dispatch => {
    const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}
    try {
		const res = await axios.get('/api/job/getPendingJobs', config);

		dispatch({
			type: PENDING_JOBS_GET_SUCCESS,
			payload: res.data
		})


	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}
	}
}

export const updateJobStatus = (body,cb) => async dispatch => {
    const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}
    try {
		await axios.post('/api/job/updateStatus', body,config);
		cb && cb();
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}
	}
}