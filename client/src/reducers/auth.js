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
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	loading: false,
	user: {
		user_name: '',
		first_name: '',
		last_name: '',
		email: '',
		type: ''
	},
	phoneNumber: {
		phone: '',
		verified: ''
	},
	Otp_auth:{
		id:null
	}
}

export default function auth(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case OTP_ID_INSERT:{
			return {
				...state,
				Otp_auth: payload
			}
		}
		case USER_LOADED:
			//localStorage.setItem('token', payload.token);
			return {
				...state, isAuthenticated: true, loading: false, user: payload
			}
		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			//console.log(payload,'payload')
			return {
				...state, isAuthenticated: true, loading: true, user: payload
			}
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state, ...payload, isAuthenticated: true, loading: false,user: payload.user
			}
		case REGISTER_FAIL:
			return {
			...initialState
		}

		case AUTH_ERROR:
			return {
				...initialState
			}

		case PHONENUMBER_GET:
			return {
				...state, isAuthenticated: true, loading: false, phoneNumber: payload
			}
		case LOGOUT:
			localStorage.removeItem('token');
			localStorage.removeItem('hireManager');
			localStorage.removeItem('expertise');
			localStorage.removeItem('expertLevel');
			localStorage.removeItem('employment');
			localStorage.removeItem('certification');
			localStorage.removeItem('languageVal');
			localStorage.removeItem('education');
			localStorage.removeItem('hourlyRate');
			localStorage.removeItem('location');
			localStorage.removeItem('titleAndOverview'); 
			localStorage.removeItem('profilePhoto'); 
			localStorage.removeItem('phoneNumber');
			localStorage.removeItem('user');
			return {
				...initialState
			}
		default:
			return state;
	}
}