import React, { useState } from "react";
import { connect } from "react-redux";
//import { Link, Redirect } from "react-router-dom";
import { Link, Redirect, useHistory } from "react-router-dom";
import { setAlert } from "../../actions/alert";
//import { register } from "../../actions/auth";
import { register, welcome_mail } from "../../actions/auth";
import PropTypes from "prop-types";
import Alert from '../../components/alert/Alert';
import { sendEmailFunc } from "../../actions/sendEmail";
import Input from '../../components/input/input';
import {SVGWidgetLogo,FormIcon} from '../../components/SVG'

const Register = ({ setAlert, register, sendEmailFunc, isAuthenticated }) => {
  
  const history = useHistory()

  const [formData , setFormData] = useState({
    user_name: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
    checked: false,
    type: "",
  });

  const { user_name, email, first_name, last_name, password, password2 , checked, type } =
    formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //if (password !== password2) {
    //  setAlert("Passwords do not match", "danger", 3000);
    //if(type===''){
    if(type==='' && checked === true){
      setAlert("User type is required", "danger", 3000);
      
    }
    else if (password !== password2) {
      setAlert("Passwords do not match", "danger", 3000);
    } 
    else{
      register({ 
        user_name,
        email,
        first_name,
        last_name,
        password,
        type,
        history
      }).then((res)=>{
        //console.log(register,isAuthenticated,'signup function') 
        console.log(res.data);
        //console.log(res);
       //debugger;
        if (res.data) {
          history.push('/completeprofile');
        }

      }).catch((err)=>{
        //console.log(err) //
        //yahan error handle karo
      })

      /*
      var emailType = "new";
      var emailAddress = email;
      sendEmailFunc(
        emailAddress,{
        emailType
      });*/
    }

  };

  /*
  if (isAuthenticated) {
    return <Redirect to="/completeprofile" />;
  }
  */
  
  return (
    <>
    <section className="box-under-container page-registration page-auth">
      <div className="container">
        <section className="box-shadow m-auto">
          <div className="text-center logo">
            <Link to="/">
              <SVGWidgetLogo/>
            </Link>                
          </div>

          <h3 className="heading">Join us</h3>
            <p className="description">Make the most of your professional life</p>
            
            
            <div className="select-user-type">
              <div className="form-check-inline">
                <label className="form-sub-heading">User Type:</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="type" id="inlineRadio1" value="Client" onChange={(e) => onChange(e)}/>
                <label className="form-check-label" for="inlineRadio1">Hire an Expert</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="type" id="inlineRadio2" value="Freelancer" onChange={(e) => onChange(e)}/>
                <label className="form-check-label" for="inlineRadio2">Offer my Services</label>
              </div>
            </div>
          <Alert />


          <form onSubmit={(e) => onSubmit(e)}>

            <Input 
              parentclass={`user`}
              labelfor={`userName`}
              id={`user1`}
              className={'error'}
              // label={`Username`}
              group={true}
              name={`user_name`}
              placeholder={`Username`}
              icon={<FormIcon icon={'user'} />}
              required={true}
              type={'text'}
              value={user_name}
              handlerOnChange={(e) => onChange(e)}
              >
                {/* <span className="error-text">Error</span> */}
              </Input>

              <Input 
                labelfor={`FirstName`}
                id={`FirstName`}
                className={'error'}
                // label={`Username`}
                group={true}
                name={`first_name`}
                placeholder={`First Name`}
                icon={<FormIcon icon={'names'} />}
                required={true}
                type={'text'}
                value={first_name}
                handlerOnChange={(e) => onChange(e)}
              >
                {/* <span className="error-text">Error</span> */}
              </Input>

              <Input 
                labelfor={`LastName`}
                id={`LastName`}
                className={'error'}
                // label={`Username`}
                group={true}
                name={`last_name`}
                placeholder={`Last Name`}
                icon={<FormIcon icon={'names'} />}
                required={true}
                type={'text'}
                value={last_name}
                handlerOnChange={(e) => onChange(e)}
              >
                {/* <span className="error-text">Error</span> */}
              </Input>
              
              <Input 
                labelfor={`Email`}
                id={`Email`}
                className={'error'}
                // label={`Username`}
                group={true}
                name={`email`}
                placeholder={`Email`}
                icon={<FormIcon icon={'email'} />}
                required={true}
                type={'email'}
                value={email}
                handlerOnChange={(e) => onChange(e)}
              >
                {/* <span className="error-text">Error</span> */}
              </Input>


              <Input 
                labelfor={`password`}
                id={`password`}
                className={'error'}
                group={true}
                name={`password`}
                placeholder={`Password (6 or more characters)`}
                icon={<FormIcon icon={'password'} />}
                required={true}
                type={'password'}
                handlerOnChange={(e) => onChange(e)}
                minLength={6}
                value={password}
                >
                {/* <span className="error-text">Error</span> */}
              </Input>

              <Input 
                labelfor={`ConfirmPassword`}
                id={`ConfirmPassword`}
                className={'error'}
                // label={`Username`}
                group={true}
                name={`password2`}
                placeholder={`Confirm Password`}
                icon={<FormIcon icon={'password'} />}
                required={true}
                type={'password'}
                handlerOnChange={(e) => onChange(e)}
                minLength={6}
                value={password2}
                >
                {/* <span className="error-text">Error</span> */}
              </Input>

            <div className="row justify-content-between">
              <div className="col-12 agreement-checkbox">              
                <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">You agree to CyberToCyber <Link>User Agreement</Link>, <Link>Privacy Policy</Link>,
                        and <Link>Cookie Policy</Link>.</label>
                </div>
              </div>
            </div>
            
            
            <button
              className="btn btn-default btn-block"
              type="submit"
            >Agree &amp; Join
            </button>
          
            <div className="py-3 login-here d-flex justify-content-between">              
              <span className="text"><Link to="/registeradmin">Admin Register</Link></span>
              <span className="text">Already have an account?  <Link to="/login">Login here</Link></span>
            </div>
          </form>

        </section>
        </div>
    </section>    
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProp, { setAlert, register, sendEmailFunc })(Register);
