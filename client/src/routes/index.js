import { connect } from 'mongoose';
import React, { useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom';
import { loadUser, PhoneNumberGet } from '../actions/auth';
import { hireManagerGet } from '../actions/clientProfile';
import { CertificateGet, EducationGet, EmploymentGet, expertiseGet, expertLevelGet, HourlyRateGet, LanguageGet, locationGet, ProfileAndPhotoGet, TitleAndOverviewGet } from '../actions/freelancerProfile';
import { postJobGet } from '../actions/postJob';
import { ContractDetails, ContractList,  OtpAuth, Phone, PostJobClient, Profile, profileAndPhoto, RegisterAdmin, SecureAccount, Contracts, About, Report } from '../pages';
import { AdminDashboard, ApplyForJob, Budget, Certificate, ChangePassword, ClientCompleteProfile, ClientProfile, CompleteProfile, Dashboard, Education, Employment, Expertise, ExpertiseLevel, Finance, ForgetPassword, Headline, Home, HourlyRate, Job, Languages, Location, Login, Messages, NotFound, Qa, Register, Scope, settings, Skills, Talent, TitleAndOverview,coc,feeAndCharges,privacyPolicy,copyright } from '../pages';
import store from '../store';
import PropTypes from "prop-types";
import setAuthToken from '../utils/setAuthToken';
import MyRoute from "./MyRoute";
import startContract from '../pages/startContract';

const AppRoutes = (props) => {
    const [authenticated, setAuthenticated] = React.useState(false);
    useEffect(() => {
        setAuthenticated(store.getState().auth.isAuthenticated)
    }, [store.getState().auth])

    useEffect(() => {
        if (store.getState().auth.token) {
            store.dispatch(loadUser());
        }
    }, [])

    useEffect(() => {
        if (authenticated) {
            store.dispatch(loadUser());
            store.dispatch(expertiseGet());
            store.dispatch(expertLevelGet());
            store.dispatch(EducationGet());
            store.dispatch(EmploymentGet());
            store.dispatch(LanguageGet());
            store.dispatch(HourlyRateGet());
            store.dispatch(ProfileAndPhotoGet());
            store.dispatch(PhoneNumberGet());
            store.dispatch(locationGet());
            store.dispatch(TitleAndOverviewGet());
            store.dispatch(CertificateGet());
            store.dispatch(hireManagerGet());
            store.dispatch(postJobGet());
        }
    }, [authenticated]);

    useEffect(() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
    }, []);


    return (
        <Switch>
            <MyRoute exact path="/" component={Home}/>
            <MyRoute exact path="/about" component={About}/>
            <MyRoute exact path="/contractDetails" component={ContractDetails}/>
            <MyRoute exact path="/report" component={Report}/>
            <MyRoute exact path="/contracts" component={Contracts}/>
            <MyRoute exact path="/login" component={Login} />
            <MyRoute exact path="/optAuth" component={OtpAuth} />
            <MyRoute exact path="/secureaccount" component={SecureAccount} />
            <MyRoute exact path="/register" component={Register} />
            <MyRoute exact path="/registeradmin" component={RegisterAdmin} />
            <MyRoute exact path="/ForgetPassword" component={ForgetPassword} />
            <MyRoute exact path="/completeprofile" component={CompleteProfile} />
            <MyRoute exact path="/clientcompleteprofile" component={ClientCompleteProfile} />
            <MyRoute exact path="/messages" component={Messages} />
            <MyRoute exact path="/job" component={Job} />
            <MyRoute exact path="/applyforjob" component={ApplyForJob} />
            <MyRoute exact path="/talent" component={Talent} />
            <MyRoute exact path="/expertise" component={Expertise} />
            <MyRoute exact path="/expertiselevel" component={ExpertiseLevel} />
            <MyRoute exact path="/education" component={Education} />
            <MyRoute exact path="/certificate" component={Certificate} />
            <MyRoute exact path="/employment" component={Employment} />
            <MyRoute exact path="/languages" component={Languages} />
            <MyRoute exact path="/hourlyrate" component={HourlyRate} />
            <MyRoute exact path="/titleandoverview" component={TitleAndOverview} />
            <MyRoute exact path="/profileandphoto" component={profileAndPhoto} />
            <MyRoute exact path="/location" component={Location} />
            <MyRoute exact path="/phone" component={Phone} />
            <MyRoute exact path="/dashboard" component={Dashboard} />
            <MyRoute exact path="/admindashboard" component={AdminDashboard} />
            <MyRoute exact path="/profile" component={Profile} />
            <MyRoute exact path="/clientprofile" component={ClientProfile} />
            <MyRoute exact path="/settings" component={settings} />
            <MyRoute exact path="/finance" component={Finance} />
            <MyRoute exact path="/qa" component={Qa} />
            <MyRoute exact path="/coc" component={coc} />
            <MyRoute exact path="/feeAndCharges" component={feeAndCharges} />
            <MyRoute exact path="/privacyPolicy" component={privacyPolicy} />
            <MyRoute exact path="/copyright" component={copyright} />
            <MyRoute exact path="/postjobclient" component={PostJobClient} />
            <MyRoute exact path="/contract" component={ContractList} />
            <MyRoute exact path="/budget" component={Budget} />
            <MyRoute exact path="/headline" component={Headline} />
            <MyRoute exact path="/startcontract" component={startContract} />
            <MyRoute exact path="/skills" component={Skills} />
            <MyRoute exact path="/scope" component={Scope} />
            <MyRoute exact path="/change-password" component={ChangePassword} />
        </Switch>
    )
}


export default AppRoutes;