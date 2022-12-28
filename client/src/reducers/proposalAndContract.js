import {
   	ATTACHMENT_GET,
	CONTRACT_GET,
	MESSAGE_GET,
	PROPOSAL_GET,
	PROPOSALCHECK_GET,
	CLIENTPROPOSALS_GET,
	PROPOSALSTATUSCATALOG_GET,
	CLIENTPROPOSALSUSERNAME_GET,
	SETCONTRACTINFORMATION
} from '../actions/types';

const initialState = {
	AttachmentsItemData: {
		message_id: '',
        attachment_link: ''
	},
	ProposalsItemData: {
		job_id: '',
		freelancer_id: '',
		hire_manager_id: '',
		payment_type_id: '',
		payment_amount: '',
		current_proposal_status: '',
		client_grade: '',
		client_comment: '',
		freelancer_grade: '',
		freelancer_comment: ''
	},
	ProposalsStatusCatalogItemData: {
		status_name: ''
	},
	MessagesItemData: {
		freelancer_id : '',
		hire_manager_id : '',
		message_text : '',
		proposal_id : '',
		proposal_catalog_status_id : ''
	},
	ContractsItemData: [],
	ProposalCheckItemData: {
		proposalSubmitted: ''
	},
	ProposalsGetByClient: {
		job_id: '',
		freelancer_id: '',
		hire_manager_id: '',
		payment_type_id: '',
		payment_amount: '',
		current_proposal_status: '',
		client_grade: '',
		client_comment: '',
		freelancer_grade: '',
		freelancer_comment: ''
	},
	ContractInitialization: {
		proposal_id: "",
		freelancer_id: "",
		hire_manager_id: "",
		job_id: "",
		contract_status: "Pending",
	},
	clientProposalUsername:{
		first_name: "",
		last_name: "",
	}
}

export default function proposalAndContract(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ATTACHMENT_GET:
			return {
				...state, isAuthenticated: true, loading: false, AttachmentsItemData: payload
			}
		case CONTRACT_GET:
			return {
				...state, isAuthenticated: true, loading: false, ContractsItemData: payload
			}
		case MESSAGE_GET:
			return {
				...state, isAuthenticated: true, loading: false, MessagesItemData: payload
			}
		case PROPOSAL_GET:
			return {
				...state, isAuthenticated: true, loading: false, ProposalsItemData: payload
			}
		case CLIENTPROPOSALS_GET:
			return {
				...state, isAuthenticated: true, loading: false, ProposalsGetByClient: payload
			}
		case PROPOSALCHECK_GET:
			return {
				...state, isAuthenticated: true, loading: false, ProposalCheckItemData: payload
			}
		case SETCONTRACTINFORMATION:
			return {
				...state, isAuthenticated: true, loading: false, ContractInitialization: {...state.ContractInitialization,...payload}
			}
		case PROPOSALSTATUSCATALOG_GET:
			return {
				...state, isAuthenticated: true, loading: false, ProposalsStatusCatalogItemData: payload
			}
		case CLIENTPROPOSALSUSERNAME_GET:
			return {
				...state, isAuthenticated: true, loading: false, clientProposalUsername: payload
			}
		default:
			return state;
	}
}