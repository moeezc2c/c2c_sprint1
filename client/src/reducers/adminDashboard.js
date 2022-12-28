import { PENDING_JOBS_GET_SUCCESS } from '../actions/types';

const initialState = {
    pendingJobs:null
};


export default function adminDashboard(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
        case PENDING_JOBS_GET_SUCCESS:
            return {
                ...state,
                pendingJobs: payload
            }
		default:
			return state;
	}
}