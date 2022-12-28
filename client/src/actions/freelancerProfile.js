import axios from 'axios';
import { setAlert } from './alert';
import {
	EXPERTISE_GET,
	EXPERTLEVEL_GET,
	EDUCATION_GET,
	EMPLOYMENT_GET,
	LANGUAGE_GET,
	HOURLYRATE_GET,
	PHONENUMBER_GET,
	PROFILEANDPHOTO_GET,
	FREELANCERLOCATION_GET,
	FREELANCERTITLEOVERVIEW_GET,
	CERTIFICATE_GET,
	FREELANCER_STATUS_GET,
	FREELANCER_LIST_GET,
	FREELANCER_GET
} from './types';
import setAuthToken from '../utils/setAuthToken';

export const addFreelancer = () => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	try {
		await axios.post('/api/freelancer', config);
		dispatch({
			type: FREELANCER_STATUS_GET,
			payload: true
		});
	} catch (err) {

		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}

	}

}
export const getFreelancer = () => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	try {
		let res = await axios.get('/api/freelancer/me', config);
		
		dispatch({
			type: FREELANCER_GET,
			payload: res.data.data
		})

	} catch (err) {
		const errors = err.response.data;
       
		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}

	}

}

export const freelancerAllGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/freelancer');

		dispatch({
			type: FREELANCER_LIST_GET,
			payload: res.data
		});

	} catch (err) {
		// const errors = err.response.data;
		// if (errors) {
		// 	dispatch(setAlert(errors.msg, 'danger'))
		// }
	}
}


export const freelancerStatusGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/freelancer/me');

		dispatch({
			type: FREELANCER_STATUS_GET,
			payload: res.data.status
		});

	} catch (err) {
		// const errors = err.response.data;
		// if (errors) {
		// 	dispatch(setAlert(errors.msg, 'danger'))
		// }
	}
}

// Expertise Get
export const expertiseGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/expertise');
		localStorage.setItem('expertise', JSON.stringify(res));

		if (res.data == null)
			res.data = [];

		dispatch({
			type: EXPERTISE_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Add Expertise Value
export const addExpertise = ({ category, skills }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ category, skills });

	try {
		const res = await axios.post('/api/expertise', body, config);
		
		// dispatch(setAlert("Certification Added Successfully", 'success'));
		dispatch(expertiseGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}

// Expert level Get
export const expertLevelGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/expertLevel');
		localStorage.setItem('expertLevel', JSON.stringify(res));

		if (res.data == null)
			res.data = [];

		dispatch({
			type: EXPERTLEVEL_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Add Expert Level Value
export const addExpertLevel = ({ expert_level }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ expert_level });

	try {
		const res = await axios.post('/api/expertLevel', body, config);

		dispatch(expertLevelGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}

// Get Education 
export const EducationGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/education');
		localStorage.setItem('education', JSON.stringify(res));

		if (res.data == null)
			res.data = [];

		dispatch({
			type: EDUCATION_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}


// Add Education 
export const addEducation = ({ provider,
			from,
			to,
			current,
			degree,
			specialization,
			description }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ provider,
			from,
			to,
			current,
			degree,
			specialization,
			description, });

	try {
		const res = await axios.post('/api/education', body, config);
		
		dispatch(setAlert("Education Added Successfully", 'success'));
		dispatch(EducationGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}

 
// Update Education 
export const updateEducation = (id , { 
		provider,
		from,
		to,
		current,
		degree,
		specialization,
		description }) => async dispatch => {

	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ 
		provider,
		from,
		to,
		current,
		degree,
		specialization,
		description });
	
	try {
		const res = await axios.put('/api/education/' + id, body, config);
		
		dispatch(setAlert("Education Update Successfully", 'success'));
		dispatch(EducationGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}
	}
}
 
// Delete Education 
export const deleteEducation = (id) => async dispatch => {
	
	try {
		const res = await axios.delete('/api/education/' + id);
		
		dispatch(setAlert("Education Delete Successfully", 'success'));
		dispatch(EducationGet());

	} catch (err) {

		const errors = err.response;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}


// Get Certificate
export const CertificateGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/certifications');
		localStorage.setItem('certification', JSON.stringify(res));

		if (res.data == null)
			res.data = [];

		dispatch({
			type: CERTIFICATE_GET,
			payload: res.data
		})

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// add certificate
export const addCertificate = ({ certification_name, provider, description, certification_link }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ certification_name, provider, description, certification_link });

	try {
		const res = await axios.post('/api/certifications', body, config)
		
		dispatch(setAlert("Certification Added Successfully", 'success'));
		dispatch(CertificateGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}


// update certificate
export const updateCertificate = (id , { certification_name, provider, description, certification_link }) => async dispatch => {

	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ certification_name, provider, description, certification_link });
	
	try {
		const res = await axios.put('/api/certifications/' + id, body, config)
		
		dispatch(setAlert("Certification Update Successfully", 'success'));
		dispatch(CertificateGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}

// delete certificate
export const deleteCertificate = (id) => async dispatch => {

	try {
		const res = await axios.delete('/api/certifications/' + id)
		
		dispatch(setAlert("Certification Delete Successfully", 'success'));
		dispatch(CertificateGet());

	} catch (err) {

		const errors = err.response;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}


// Get Employment
export const EmploymentGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/employment');
		localStorage.setItem('employment', JSON.stringify(res));
		
		if (res.data == null)
			res.data = [];

		dispatch({
			type: EMPLOYMENT_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Add Employment
export const addEmployment = ({ company_name,
			city,
			country,
			title,
			from,
			to,
			current,
			description }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ company_name,
			city,
			country,
			title,
			from,
			to,
			current,
			description });

	try {
		const res = await axios.post('/api/employment', body, config);
		
		dispatch(setAlert("Employment Added Successfully", 'success'));
		dispatch(EmploymentGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}

// Update Employment
export const updateEmployment = (id , { 
		company_name,
		city,
		country,
		title,
		from,
		to,
		current,
		description }) => async dispatch => {

	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ 
		company_name,
		city,
		country,
		title,
		from,
		to,
		current,
		description });
	
	try {
		const res = await axios.put('/api/employment/' + id, body, config);
		
		dispatch(setAlert("Employment Update Successfully", 'success'));
		dispatch(EmploymentGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}
	}
}

// Delete Employment
export const deleteEmployment = (id) => async dispatch => {

	try {
		const res = await axios.delete('/api/employment/' + id)
		
		dispatch(setAlert("Employment Delete Successfully", 'success'));
		dispatch(EmploymentGet());

	} catch (err) {

		const errors = err.response;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}


// Get Languages
export const LanguageGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/language');
		localStorage.setItem('languageVal', JSON.stringify(res));

		if (res.data == null)
			res.data = [];

		dispatch({
			type: LANGUAGE_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Add Languages
export const addLanguage = ({ language,
			proficiency }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ language,
			proficiency });

	try {
		const res = await axios.post('/api/language', body, config);
		
		dispatch(setAlert("Language Added Successfully", 'success'));
		dispatch(LanguageGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}

// Update Languages
export const updateLanguage = (id , { 
		language,
		proficiency }) => async dispatch => {

	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ 
		language,
		proficiency });
	
	try {
		const res = await axios.put('/api/language/' + id, body, config);
		
		dispatch(setAlert("Language Update Successfully", 'success'));
		dispatch(LanguageGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}
	}
}


// Delete Languages
export const deleteLanguage = (id) => async dispatch => {

	try {
		const res = await axios.delete('/api/language/' + id)
		
		dispatch(setAlert("Language Delete Successfully", 'success'));
		dispatch(LanguageGet());

	} catch (err) {

		const errors = err.response;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}

// Get Hourly Rate
export const HourlyRateGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/hourlyRate');
		localStorage.setItem('hourlyRate', JSON.stringify(res));

		if (res.data == null)
			res.data = [];

		dispatch({
			type: HOURLYRATE_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Add HourlyRate
export const addHourlyRate = ({ hourly_rate }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ hourly_rate });

	try {
		const res = await axios.post('/api/hourlyRate', body, config);
		
		dispatch(HourlyRateGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}

// Title and overview Get
export const TitleAndOverviewGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/titleAndOverview');
		localStorage.setItem('titleAndOverview', JSON.stringify(res));

		if (res.data == null)
			res.data = [];

		dispatch({
			type: FREELANCERTITLEOVERVIEW_GET,
			payload: res.data
		});


	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Add Title and overview Value
export const addtitleAndOverview = ({ title,
            professional_overview }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ title,
            professional_overview });

	try {
		const res = await axios.post('/api/titleAndOverview', body, config);
		
		// dispatch(setAlert("Certification Added Successfully", 'success'));
		dispatch(TitleAndOverviewGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}

// Get Profile and Photo 
export const ProfileAndPhotoGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/profilePhoto');
		localStorage.setItem('profilePhoto', JSON.stringify(res));

		if (res.data == null)
			res.data = {};


		dispatch({
			type: PROFILEANDPHOTO_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Add Profile and Photo
export const addProfileAndPhoto = ({ photo_link }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ photo_link });

	try {
		const res = await axios.post('/api/profilePhoto', body, config);
		
		dispatch(ProfileAndPhotoGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}


// Location freelancer Get
export const locationGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/location');
		localStorage.setItem('location', JSON.stringify(res));

		if (res.data == null)
			res.data = [];

		dispatch({
			type: FREELANCERLOCATION_GET,
			payload: res.data
		});

	} catch (err) {
		
		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Add Location freelancer Value
export const addLocation = ({ country,
            address,
            suite,
            city,
            province,
            zip }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ country,
            address,
            suite,
            city,
            province,
            zip });

	try {
		const res = await axios.post('/api/location', body, config);
		
		// dispatch(setAlert("Certification Added Successfully", 'success'));
		dispatch(locationGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}