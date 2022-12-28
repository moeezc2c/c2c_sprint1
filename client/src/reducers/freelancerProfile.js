import {
	EXPERTISE_GET,
	EXPERTLEVEL_GET,
	EDUCATION_GET,
	EMPLOYMENT_GET,
	LANGUAGE_GET,
	HOURLYRATE_GET,
	PROFILEANDPHOTO_GET,
	FREELANCERLOCATION_GET,
	FREELANCERTITLEOVERVIEW_GET,
	CERTIFICATE_GET,
	FREELANCER_STATUS_GET,
	FREELANCER_LIST_GET,
	FREELANCER_GET
} from '../actions/types';

const initialState = {
	freelancerStatus: false,
	freelancerList: [],
	freelancerProfile: {},
	expertise: {
		category: '',
		skills: ''
	},
	expertLevel: {
		expert_level: ''
	},
	education: {
		provider:'',
		from: '',
		to: '',
		current: '',
		degree: '',
		specialization: '',
		description: ''
	},
	employment: {
		company_name: '',
		city: '',
		country: '',
		title: '',
		from: '',
		to: '',
		current: '',
		description: ''
	},
	languageVal: {
		language: '',
		proficiency: ''
	},
	hourlyRate: {
		hourly_rate: ''
	},
	profileAndPhoto: {
		photo_link: ''
	},
	phoneNumber: {
		phone: '',
		verified: ''
	},
	Location: {
		country: '',
		address: '',
		suite: '',
		city: '',
		province: '',
		zip: ''
	},
	TitleAndOverview: {
		title: '',
		professional_overview: ''
	},
	certification: {
        certification_name: '',
        provider: '',
        description: '',
	}
}

export default function freelancerProfile(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {

		case FREELANCER_GET:
			return {
				...state, isAuthenticated: true, loading: false, freelancerProfile: payload
			}
		case FREELANCER_LIST_GET:
			return {
				...state, isAuthenticated: true, loading: false, freelancerList: payload
			}
		case FREELANCER_STATUS_GET:
			return {
				...state, isAuthenticated: true, loading: false, freelancerStatus: payload
			}
		case EXPERTISE_GET:
			return {
				...state, isAuthenticated: true, loading: false, expertise: payload
			}
		case EXPERTLEVEL_GET:
			return {
				...state, isAuthenticated: true, loading: false, expertLevel: payload
			}
		case EDUCATION_GET:
			return {
				...state, isAuthenticated: true, loading: false, education: payload
			}
		case CERTIFICATE_GET:
			return {
				...state, isAuthenticated: true, loading: false, certification: payload
			}
		case EMPLOYMENT_GET:
			return {
				...state, isAuthenticated: true, loading: false, employment: payload
			}
		case LANGUAGE_GET:
			return {
				...state, isAuthenticated: true, loading: false, languageVal: payload
			}
		case HOURLYRATE_GET:
			return {
				...state, isAuthenticated: true, loading: false, hourlyRate: payload
			}
		case PROFILEANDPHOTO_GET:
			return {
				...state, isAuthenticated: true, loading: false, profileAndPhoto: payload
			}
		case FREELANCERLOCATION_GET:
			return {
				...state, isAuthenticated: true, loading: false, Location: payload
			}
		case FREELANCERTITLEOVERVIEW_GET:
			return {
				...state, isAuthenticated: true, loading: false, TitleAndOverview: payload
			}
		default:
			return state;
	}
}