import {
   	EMAILSENT
} from '../actions/types';

const initialState = {
	SendEmailData: {
		emailAddress: ''
	}
}

export default function SendEmail(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case EMAILSENT:
			return {
				...state, isAuthenticated: true, loading: false, SendEmailData: payload
			}
		default:
			return state;
	}
}