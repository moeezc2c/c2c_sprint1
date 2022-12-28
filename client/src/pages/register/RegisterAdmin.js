import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect ,useHistory} from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { Icon } from 'react-icons-kit';
import { userO } from 'react-icons-kit/fa/userO';
import { key } from 'react-icons-kit/fa/key';
import { envelopeO } from 'react-icons-kit/fa/envelopeO';
import { edit } from 'react-icons-kit/fa/edit';
import Alert from '../../components/alert/Alert';
import { sendEmailFunc } from "../../actions/sendEmail";
import Input from '../../components/input/input';
import {SVGWidgetLogo,FormIcon} from '../../components/SVG'

const RegisterAdmin = ({ setAlert, register, sendEmailFunc, isAuthenticated }) => {
  const history = useHistory();
  const [formData , setFormData] = useState({
    user_name: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
    checked: false,
    type: "Admin",
  });

  const { user_name, email, first_name, last_name, password, password2 , checked, type } =
    formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger", 3000);
    } else {
      register({
        user_name,
        email,
        first_name,
        last_name,
        password,
        type,
      },()=>history.push('/'));
    }
  };

  return (
    <section className="box-under-container page-registration page-auth">
      <div className="container">

      
      <section className="box-shadow m-auto">
              <div className="text-center logo">
                <Link to="/">
                  <SVGWidgetLogo/>
                </Link>                
              </div>

                <h3 className="heading">Join Us</h3>
                <p className="description">
                Make the most of your professional life
                </p>
           
              <Alert />
              <form className="form" onSubmit={(e) => onSubmit(e)}>
                
              <Input 
                  parentclass={`user`}
                  labelfor={`userName`}
                  id={`user1`}
                  className={'error'}
                  // label={`Username`}
                  group={true}
                  name={'user_name'}
                  placeholder={`Username`}
                  icon={<FormIcon icon={'user'} />}
                  required={true}
                  type={'text'}
                  value={user_name}
                  handlerOnChange={(e) => onChange(e)}
                  >
                    {/* <span className="error-text">Error</span> */}
                  </Input>
                  
                  
                  {/* <div className="form-group">
                  <label className="mb-1">Username</label>
                  <div className="position-relative icon-form-control">
                    <Icon className="position-absolute icon-react" icon={userO} />
                    <input
                      type="text"
                      className="form-control"
                      name="user_name"
                      value={user_name}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div> */}


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

                {/* <div className="form-group">
                    <label className="mb-1">
                    <input
                     type="checkbox"
                     name="checkbox"
                     className="mr-1"
                     checked="checked" /> You agree to the CyberToCyber <Link to="">User Agreement</Link>, <Link to="">Privacy Policy</Link>, and <Link to="">Cookie Policy</Link>.</label>
                </div> */}
                <button
              className="btn btn-default btn-block"
              type="submit"
            >Agree &amp; Join
            </button>
                {/*<div className="text-center mt-3 border-bottom pb-3">
                      <p className="small text-muted">Or login with</p>
                      <div className="row">
                          <div className="col-6">
                              <button type="button" className="btn btn-outline-instagram btn-block"><i className="mdi mdi-instagram"></i> Instagram</button>
                          </div>
                          <div className="col-6">
                              <button type="button" className="btn btn-outline-facebook btn-block"><i className="mdi mdi-facebook"></i> Facebook</button>
                          </div>
                      </div>
                  </div>*/}
                  <div className="py-3 login-here">              
                    <span className="text">Already have an account?  <Link to="/login">Login here</Link></span>
                  </div>
                  {/* <div className="py-3 d-flex align-item-center">
                      <Link to="/ForgetPassword">Forgot password?</Link>
                      <span className="ml-auto"> Already on freelance? <Link to="/login">Sign in</Link></span>
                  </div> */}
              </form>
    </section>

    </div>
    </section>
  );
};

RegisterAdmin.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProp, { setAlert, register, sendEmailFunc })(RegisterAdmin);
