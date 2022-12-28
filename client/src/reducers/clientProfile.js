import {
    HIREMANAGER_GET,
    SKILLS_GET
} from '../actions/types';

const initialState = {
	hireManager: {
		company_id: '',
        overview: '',
        skills_level_id: '',
        experience_level: '',
        location:''
	},
	skills: {
		_id: '',
		skill_name: ''
	}
}

export default function clientProfile(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case HIREMANAGER_GET:
			return {
				...state, isAuthenticated: true, loading: false, hireManager: payload
			}
		case SKILLS_GET:
			return {
				...state, isAuthenticated: true, loading: false, skills: payload
			}
		default:
			return state;
	}
}