import axios from 'axios';
import { setAlert } from './alert';

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	PHONENUMBER_GET,
	OTP_ID_INSERT
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { expertiseGet, expertLevelGet, EducationGet, CertificateGet, EmploymentGet, LanguageGet, HourlyRateGet, ProfileAndPhotoGet, locationGet, TitleAndOverviewGet } from "./freelancerProfile";
import { hireManagerGet } from "./clientProfile";
import { postJobGet } from "./postJob";
import { sendEmailFunc } from "./sendEmail";

// Load User
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data
		})

	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		})
	}
}


// Register User
export const register = ({ user_name, email, first_name, last_name, password, type }, cb, cbUser) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ user_name, email, first_name, last_name, password, type });

	/*
	try {
		const res = await axios.post('/api/users', body, config);
		if (res.status === 200) {
			if (type === "Admin") {
				cb && cb();
				dispatch(setAlert("Your profile is sent for approval Kindly wait you will be notified via email", 'success'));
			} else {
				dispatch({
					type: REGISTER_SUCCESS,
					payload: res.data
				})
				dispatch(loadUser());
				cbUser && cbUser()
			}
		} else {
			dispatch(setAlert(res.data.msg, 'danger'))
		}
	} catch (err) {

		const errors = err.response.data.errors || [{ msg: "Registertion Failed" }];

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}
	}

	*/

	try {
		const res = await axios.post('/api/users', body, config);
		
	    if (res.data) {
			
			if(type === "Admin"){
				cb && cb();	
				dispatch(setAlert("Your profile is sent for approval Kindly wait you will be notified via email", 'success'));
			}
			else{
				
				//const type = arg.type;
				dispatch({
					type: REGISTER_SUCCESS,
					payload:res.data
				})
				
			    //console.log(res.data);
				dispatch(loadUser());
				return res;
				//dispatch(setAlert("User Registered", 'success'));
			}
		  }
		
	} catch (err) {

		console.log(err);
		
		const errors = err.response.data.errors 
	
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}
		
		dispatch({
			type: REGISTER_FAIL
		})

	}

}


// Register User
// export const forgetpassword = ({ email }) => async dispatch => {
// 	const config = {
// 		headers: {
// 			'Content-Type': 'Application/json'
// 		}
// 	}

// 	const body = JSON.stringify({ email });

// 	try {
// 		const res = await axios.post('/api/users', body, config);

// 		dispatch({
// 			type: REGISTER_SUCCESS,
// 			payload: res.data
// 		})
// 		dispatch(loadUser());
// 	} catch (err) {
// 		const errors = err.response.data.errors;
// 		if (errors) {
// 			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
// 		}
// 		dispatch({
// 			type: REGISTER_FAIL
// 		})
// 	}
// }



// Login User
export const otpVerification = (code, id, cb,cbF) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ code, id });

	try {
		const res = await axios.post('/api/auth/otpverification', body, config);
		if (res.status === 200) {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			})


			dispatch(expertiseGet());
			dispatch(expertLevelGet());
			dispatch(EducationGet());
			dispatch(EmploymentGet());
			dispatch(LanguageGet());
			dispatch(HourlyRateGet());
			dispatch(ProfileAndPhotoGet());
			dispatch(PhoneNumberGet());
			dispatch(locationGet());
			dispatch(TitleAndOverviewGet());
			dispatch(CertificateGet());
			dispatch(hireManagerGet());
			dispatch(postJobGet());
			dispatch(sendEmailFunc());

			cb && cb();
		}
	} catch (err) {
		const errors = err.response.data.errors;
		cbF && cbF();
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: LOGIN_FAIL
		})
	}

}


export const login = (user_name, password, redirect_2FA) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ user_name, password });

	try {
		const res = await axios.post('/api/auth', body, config);
		console.log(res.data.user.type);
		if (res.status === 200) {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			})


			dispatch(expertiseGet());
			dispatch(expertLevelGet());
			dispatch(EducationGet());
			dispatch(EmploymentGet());
			dispatch(LanguageGet());
			dispatch(HourlyRateGet());
			dispatch(ProfileAndPhotoGet());
			dispatch(PhoneNumberGet());
			dispatch(locationGet());
			dispatch(TitleAndOverviewGet());
			dispatch(CertificateGet());
			//dispatch(hireManagerGet());
			if(res.data.user.type == "Client")
			{
				dispatch(hireManagerGet());
			}
			dispatch(postJobGet());
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (err.response.status === 302) {
			dispatch({ type: OTP_ID_INSERT, payload: { id: err.response.data.id } });
			redirect_2FA && redirect_2FA();
		}

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: LOGIN_FAIL
		})
	}

}

/*
// Logout / Clear Profile
export const logout = (cb) => dispatch => {
	dispatch({ type: LOGOUT })
	window.location.href = "/";
	cb && cb();
}
*/

export const logout = () => dispatch => {
	try{
		dispatch({ type: LOGOUT })
		//console.log(cb);
		//cb && cb();
	}
	catch(err){
        console.log(err);
	}
	
/*
// Forgot /Password

export const enableMFA = (cb) => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	try {
		const res = await axios.get('/api/auth/enablemfa', config);
		if (res.status === 200) {
			cb && cb();ab huwa
			dispatch(setAlert(res.data.msg, 'success'));
		}
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}
	}*/
}


export const forgotPassword = (body, setLoading, setSteps, history) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const APIbody = JSON.stringify({
		...body
	});

	try {
		setLoading(true);
		const res = await axios.post('/api/auth/forgot-password', APIbody, config);

		setLoading(false);

		if (body.reset_type === 'email') {
			setSteps(0);
		} else {
			history.push('/change-password?reset_type=phone')
		}
	} catch (err) {
		setLoading(false);
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}
	}
}


// Reset Password

export const resetPassword = (body) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const APIbody = JSON.stringify({
		...body
	});

	try {
		const res = await axios.post('/api/auth/reset-password', APIbody, config);
		dispatch(setAlert(res.data.message, 'success'))
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}
	}
}


// Phone number Get
export const PhoneNumberGet = () => async dispatch => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/phone');
		localStorage.setItem('phoneNumber', JSON.stringify(res.data));
		
		if (res.data == null)
			res.data = [];

		dispatch({
			type: PHONENUMBER_GET,
			payload: res.data
		});

	} catch (err) {

		const errors = err.response.data;

		if (errors) {
			dispatch(setAlert(errors.msg, 'danger'))
		}
	}
}

// Add Phone number Value
export const addPhoneNumber = ({ phone, codeBody }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ phone, codeBody });

	try {
		const res = await axios.post('/api/phone', body, config);

		dispatch(setAlert("Code Sent Successfully", 'success'));

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}


// Verify Phone number code
export const PhoneNumberVerify = ({ codeBodyTextVal }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'Application/json'
		}
	}

	const body = JSON.stringify({ codeBodyTextVal });

	try {
		const res = await axios.post('/api/phone/checkCode', body, config);

		if (res.data.error) {
			dispatch(setAlert(res.data.error, 'success'));
		} else {
			dispatch(setAlert("Code Verified Successfully", 'success'));
		}

		dispatch(PhoneNumberGet());

	} catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

	}

}