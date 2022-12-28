import {
    POSTJOB_GET,
    COMPLEXITY_GET,
	EXPECTEDDUARATION_GET,
	PAYMENTTYPE_GET,
	SKILLS_GET,
	JOBDETAIL_GET
} from '../actions/types';

const initialState = {
	postJobData: [],
	complexityLevel: {
		_id: '',
		complexity: ''
	},
	expectedDurationVal: {
		_id: '',
		duration_text: ''
	},
	paymentTypeVal: {
		_id: '',
		type_name: ''
	},
	skills: {
		_id: '',
		skill_name: ''
	},
	deleteJobData: {
		id: '',
		headline: ''
	},
	jobDetailData: {
		_id: '',
		hire_manager_id: '',
		expected_duration_id: '',
		complexity_id: '',
		description: '',
		main_skill_id: '',
		payment_type_id: '',
		payment_amount: '',
		headline: '',
		job_post_time: '',
		location: ''
	},
	applyforjob: {
		id: ''
	}
}

export default function postJob(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case POSTJOB_GET:
			return {
				...state, isAuthenticated: true, loading: false, postJobData: payload
			}
		case COMPLEXITY_GET:
			return {
				...state, isAuthenticated: true, loading: false, complexityLevel: payload
			}
		case EXPECTEDDUARATION_GET:
			return {
				...state, isAuthenticated: true, loading: false, expectedDurationVal: payload
			}
		case PAYMENTTYPE_GET:
			return {
				...state, isAuthenticated: true, loading: false, paymentTypeVal: payload
			}
		case SKILLS_GET:
			return {
				...state, isAuthenticated: true, loading: false, skills: payload
			}
		case JOBDETAIL_GET:
			return {
				...state, isAuthenticated: true, loading: false, jobDetailData: payload
			}
		default:
			return state;
	}
}