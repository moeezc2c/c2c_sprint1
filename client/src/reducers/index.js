import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import adminDashboard from './adminDashboard';
import freelancerProfile from './freelancerProfile';
import clientProfile from './clientProfile';
import postJob from './postJob';
import proposalAndContract from './proposalAndContract';
import sendEmail from './sendEmail';

export default combineReducers({
    adminDashboard,
    alert,
    auth,
    freelancerProfile,
    clientProfile,
    postJob,
    proposalAndContract,
    sendEmail
});