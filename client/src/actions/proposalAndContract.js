import axios from 'axios';
import { setAlert } from './alert';
import {
	ATTACHMENT_GET,
	CONTRACT_GET,
	MESSAGE_GET,
	PROPOSAL_GET,
	PROPOSALCHECK_GET,
	CLIENTPROPOSALS_GET,
	PROPOSALSTATUSCATALOG_GET,
	CLIENTPROPOSALSUSERNAME_GET
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { toast } from 'react-toastify';


// Attachment Get
export const attachmentGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/attachment');

		if (res.data == null)
			res.data = [];

		dispatch({
			type: ATTACHMENT_GET,
			payload: res.data
		});

	} catch (err) {

		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Attachment Get by Id
export const attachmentGetbyId = (id) => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/attachment/' + id);

		if (res.data == null)
			res.data = [];

		dispatch({
			type: ATTACHMENT_GET,
			payload: res.data
		});

	} catch (err) {

		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Attachment Delete 
export const attachmentDelete = (id) => async dispatch => {

	try {
		const res = await axios.delete('/api/attachment/' + id);
		dispatch(setAlert("Job Delete Successfully", 'success'));
		dispatch(attachmentGet());

	} catch (err) {

		const errors = err.response;
		if (errors) {
			errors.forch(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}

// Attachment Add 
export const attachmentAdd = ({ message_id, attachment_link }) => async dispatch => {
		const config = {
			headers: {
				'Content-Type': 'Application/json'
			}
		}

		const body = JSON.stringify({
			message_id,
			attachment_link
		});

		try {
			const res = await axios.post('/api/attachment', body, config);

			dispatch(attachmentGet());

		} catch (err) {

			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
			}

		}

	}




// Contract Get
export const contractGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/contract');

		if (res.data.data == null)
			res.data.data = [];

		dispatch({
			type: CONTRACT_GET,
			payload: res.data.data
		});

	} catch (err) {

		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

//Verify Contract status
export const contractVerify = (data,cb) => async dispatch => {
	
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.post('/api/contract/verify', data);
		cb && cb(res.data);
		dispatch(contractGet());
	}catch(e) {
		const error = e.response.data;
		toast.error(error.msg);
	}
};


// Contract Get by Id
export const contractGetbyId = (id) => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/contract/' + id);

		if (res.data == null)
			res.data = [];

		dispatch({
			type: CONTRACT_GET,
			payload: res.data
		});

	} catch (err) {

		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Contract Delete 
export const contractDelete = (id) => async dispatch => {

	try {
		const res = await axios.delete('/api/contract/' + id);
		toast.success("Job Delete Successfully")
		dispatch(contractGet());

	} catch (err) {

		const errors = err.response;
		if (errors) {
			errors.forch(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}

// Contract Add
export const contractAdd = (data,cb) => async dispatch => {
		const config = {
			headers: {
				'Content-Type': 'Application/json'
			}
		}

		const body = JSON.stringify(data);

		try {
			const res = await axios.post('/api/contract', body, config);
			toast.success(res.data.msg);
			cb && cb();
		} catch (err) {
			const errors = err.response.data;

			if (errors) {
				toast.error(errors.msg);
			}

		}

	}



// Message Get
export const messageGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/message');

		if (res.data == null)
			res.data = [];

		dispatch({
			type: MESSAGE_GET,
			payload: res.data
		});

	} catch (err) {

		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Message Get by Id
export const messageGetbyId = (id) => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/message/' + id);

		if (res.data == null)
			res.data = [];

		dispatch({
			type: MESSAGE_GET,
			payload: res.data
		});

	} catch (err) {

		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Message Delete 
export const messageDelete = (id) => async dispatch => {

	try {
		const res = await axios.delete('/api/message/' + id);
		dispatch(setAlert("Job Delete Successfully", 'success'));
		dispatch(messageGet());

	} catch (err) {

		const errors = err.response;
		if (errors) {
			errors.forch(error => dispatch(setAlert(error.msg, 'danger')))
		}
	}
}

//message Read

export const messageRead = (id,cb) => async dispatch => {
	try {
		await axios.put('/api/message/read/' + id);
		dispatch(messageGetbyId(id));
		cb && cb();
	} catch (err) {
		const errors = err.response;
		if (errors) {
			errors.forch(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}
}

// Message Add
export const messageAdd = ({ freelancer_id,
	hire_manager_id,
	user_name,
	message_text,
	message_type,
	message_file_properties,
	proposal_id,
	proposal_catalog_status_id }) => async dispatch => {
		const config = {
			headers: {
				'Content-Type': 'Application/json'
			}
		}

		const body = JSON.stringify({
			freelancer_id,
			hire_manager_id,
			user_name,
			message_text,
			message_type,
			message_file_properties,
			proposal_id,
			proposal_catalog_status_id
		});

		try {
			const res = await axios.post('/api/message', body, config);

			// dispatch(messageGet());

		} catch (err) {

			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
			}

		}

	}



// Proposal Get
export const proposalGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/proposal');

		if (res.data == null)
			res.data = [];

		dispatch({
			type: PROPOSAL_GET,
			payload: res.data
		});

	} catch (err) {

		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Proposal Get by Id
export const proposalGetbyId = (id) => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/proposal/' + id);

		if (res.data == null)
			res.data = [];

		dispatch({
			type: PROPOSAL_GET,
			payload: res.data
		});

	} catch (err) {

		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Proposal check by Id
export const proposalCheckbyId = (id,body) => async dispatch => {
	
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	try {
		const res = await axios.post('/api/proposal/check/' + id,JSON.stringify(body),config);

		if (res.data == null)
			res.data = [];

		dispatch({
			type: PROPOSALCHECK_GET,
			payload: res.data
		});

	} catch (err) {

		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}


// Proposal get by clients
export const proposalGetByClient = (userinfo,cb) => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get(`/api/proposal/getproposalbyclient/${userinfo._id}/${userinfo.type}`);

		if (res.data == null)
			res.data = [];

		dispatch({
			type: CLIENTPROPOSALS_GET,
			payload: res.data
		});

		cb && cb();

	} catch (err) {

		const errors = err;

		if (errors) {
			dispatch(setAlert(errors, 'danger'))
		}
	}
}

// Proposal get by clients
export const GetProposalUserName = (id) => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/profile/getUserName/' + id);

		dispatch({
			type: CLIENTPROPOSALSUSERNAME_GET,
			payload: res.data
		});


	} catch (err) {

		const errors = err;


		if (errors) {
			dispatch(setAlert(errors, 'danger'))
		}
	}
}

// Proposal Delete 
export const proposalDelete = (id) => async dispatch => {

	try {
		const res = await axios.delete('/api/proposal/' + id);
		dispatch(setAlert("Job Delete Successfully", 'success'));
		dispatch(proposalGet());

	} catch (err) {

		const errors = err.response;
		if (errors) {
			errors.forch(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}

// Proposal Add
export const proposalAdd = ({ job_id,
	freelancer_id,
	hire_manager_id,
	payment_type_id,
	payment_amount,
	current_proposal_status,
	client_grade,
	client_comment,
	user_name,
	freelancer_grade,
	freelancer_comment },cb) => async dispatch => {
		const config = {
			headers: {
				'Content-Type': 'Application/json'
			}
		}

		const body = JSON.stringify({
			job_id,
			freelancer_id,
			hire_manager_id,
			payment_type_id,
			payment_amount,
			current_proposal_status,
			client_grade,
			client_comment,
			user_name,
			freelancer_grade,
			freelancer_comment
		});

		try {
			await axios.post('/api/proposal', body, config);
			dispatch(setAlert("Proposal Submit Successfully", 'success'));
			dispatch(proposalGet());
			cb && cb();

		} catch (err) {

			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
			}

		}

	}



// ProposalStatusCatalog Get
export const proposalStatusCatalogGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/proposalStatusCatalog');

		if (res.data == null)
			res.data = [];

		dispatch({
			type: PROPOSALSTATUSCATALOG_GET,
			payload: res.data
		});

	} catch (err) {

		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// ProposalStatusCatalog Get by Id
export const proposalStatusCatalogGetbyId = (id) => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/proposalStatusCatalog/' + id);

		if (res.data == null)
			res.data = [];

		dispatch({
			type: PROPOSALSTATUSCATALOG_GET,
			payload: res.data
		});

	} catch (err) {

		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// ProposalStatusCatalog Delete 
export const proposalStatusCatalogDelete = (id) => async dispatch => {

	try {
		const res = await axios.delete('/api/proposalStatusCatalog/' + id);
		dispatch(setAlert("Job Delete Successfully", 'success'));
		dispatch(proposalStatusCatalogGet());

	} catch (err) {

		const errors = err.response;
		if (errors) {
			errors.forch(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}

// ProposalStatusCatalog Add
export const proposalStatusCatalogAdd = ({ status_name }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ status_name });

	try {
		const res = await axios.post('/api/proposalStatusCatalog', body, config);

		dispatch(proposalStatusCatalogGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}

