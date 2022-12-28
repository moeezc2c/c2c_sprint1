import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { forgotPassword } from "../../actions/auth";
import PropTypes from "prop-types";
import { Icon } from 'react-icons-kit'
import { envelopeO } from 'react-icons-kit/fa/envelopeO';
import { sendEmailFunc } from "../../actions/sendEmail";
import Alert from '../../components/alert/Alert';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './forgotPassword.css';
import Input from '../../components/input/input';
import {SVGWidgetLogo,FormIcon} from '../../components/SVG';


const ForgetPassword = ({ }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [key, setKey] = useState('email');
  const [phone, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState(1);
  const [formData, setFormData] = useState({
    emailAddress: "",
  });

  const { emailAddress } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let body;
    if (key === 'email') {
      body = {
        email: formData.emailAddress,
        reset_type: key
      }
    }
    if (key === 'phone') {
      body = {
        phone: phone,
        reset_type: key
      }
    }
    dispatch(forgotPassword(body, setLoading, setSteps, history))
    // try {
    //   setLoading(true);
    //   const res = await axios.post('/api/auth/forgot-password', body);

    //   setLoading(false);

    //   if (body.reset_type === 'email') {
    //     setSteps(0);
    //     setTimeout(() => {
    //       history.push('/')
    //     }, 2000);
    //   } else {
    //     history.push('/change-password?reset_type=phone')
    //   }
    // } catch (err) {
    //   setLoading(false);
    //   const errors = err.response.data.errors;
    //   if (errors) {
    //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    //   }
    // }
  }

  return (
    <section className="box-under-container page-forgetpassword page-auth">
      <div className="container">
      <section className="box-shadow m-auto">
        
          

          {steps === 1 && <div className="login">

                <div className="text-center logo">
                  <Link to="/">
                    <SVGWidgetLogo/>
                  </Link>                
                </div>
                <h3 className="heading">Forgot your password?</h3>
                <p className="description">Please enter your email or phone to reset your password</p>

              {/* <div className="text-center mb-4">
                <Link to="/">
                  <img src="assets/images/fav.svg" alt="" />
                </Link>              
              </div> */}

            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="email" title="Reset using Email">

                <Input 
                  parentclass={`emailAddress`}
                  labelfor={`emailAddress`}
                  id={`emailAddress`}
                  className={'error'}
                  // label={`Email`}
                  group={true}
                  name={`emailAddress`}
                  placeholder={`Email`}
                  icon={<FormIcon icon={'email'} />}
                  required={true}
                  type={'email'}
                  value={emailAddress}
                  handlerOnChange={(e) => onChange(e)}
                  >
                    {/* <span className="error-text">Error</span> */}
                  </Input>


                  {/* <div className="form-group">
                    <Alert />
                    <label className="mb-1">Email</label>
                    <div className="position-relative icon-form-control">
                      <Icon className="position-absolute icon-react" icon={envelopeO} />
                      <input
                        type="email"
                        className="form-control"
                        name="emailAddress"
                        value={emailAddress}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div> */}
                  <button className="btn btn-default btn-block" type="button" onClick={(e) => onSubmit(e)}> Send Email </button>

                </Tab>
                <Tab eventKey="phone" title="Reset using Phone">
                  <div className="form-group">
                    <Alert />
                    {/* <label className="mb-1">Phone</label> */}
                    <div className="icon-form-control form-group cyber-form-control">
                      
                      <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="PK"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={setValue}
                        error={phone ? (isValidPhoneNumber(phone) ? undefined : 'Invalid phone number') : 'Phone number required'} />
                      <span className="error-text">{phone && isValidPhoneNumber(phone) ? '' : 'Incorrect Phone Number'}</span>
                      

                    </div>
                  </div>
                  <button disabled={!isValidPhoneNumber(phone)} className="btn btn-default btn-block" type="button" onClick={onSubmit}> Send OTP </button>

                </Tab>
              </Tabs>
              <div className="py-3 d-flex align-item-center join-now">
                <span className="ml-auto">
                  <Link to="/login">Sign In</Link>
                  <span className="ml-auto"> New to freelance? <Link to="/register">Join now</Link></span>
                </span>
              </div>
            </div>}

            {
              steps === 0 && <div className="osahan-login py-4">
                <div className="text-center mb-4">
                  <Link to="/">
                    <img src="assets/images/fav.svg" alt="" />
                  </Link>
                  <h5 className="font-weight-bold mt-3">Recovery link Sent to your Email</h5>
                  <p className="text-muted">
                    Please check your email
                  </p>
                </div>
              </div>
            }

    {/* <div className="bkg-login">
      <div className="container">
        <div className="row justify-content-center align-items-center d-flex">
          <div className="col-lg-4 mx-auto">
            
            
          </div>
        </div>
      </div>
    </div> */}

    </section>
    </div>
    </section>
  );
};


ForgetPassword.propTypes = {
  forgetpassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  sendEmail: state.sendEmail,
});

export default connect(mapStateToProp, { forgotPassword })(ForgetPassword);