import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect, NavLink, useHistory } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink';
import {  PhoneNumberVerify } from "../../actions/auth";
import {  addPhoneNumber } from "../../actions/auth";
import 'react-phone-number-input/style.css'
import PhoneInput, {  isValidPhoneNumber } from 'react-phone-number-input';
import Alert from '../../components/alert/Alert';


const Phone = ({ user: { phoneNumber,user }, setAlert, addPhoneNumber, PhoneNumberVerify, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    codeBodyTextVal: ""
  });

  const [phone, setValue] = useState();
  const [update, setUpdate] = useState(false);

  const { codeBodyTextVal } = formData;

  useEffect(() => {
    setFormData(phoneNumber);
  }, []);

  useEffect(() => {
    if (phoneNumber.verified) {
      setUpdate(false);
    } else {
      setUpdate(true);
    }
  }, [phoneNumber]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let history = useHistory();

  const sendCode = async (e) => {
    e.preventDefault();
    var codeBody = Math.floor(100000 + Math.random() * 900000);
    addPhoneNumber({
      phone,
      codeBody
    });
  }

  const codeVerify = async (e) => {
    e.preventDefault();
    PhoneNumberVerify({
      codeBodyTextVal
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    user.type === 'Client' ? history.push("/clientprofile") : history.push("/profile");;
    
  };

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <section className="main-page page-dashboard">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <UserProfileNavLink />
          </div>
          <div className="col-lg-9">
            <div className="bg-white rounded shadow-sm sidebar-page-right">
            <div className="box-title border-bottom p-4">
                      <h4 className="h4 m-0">Phone</h4>
                    </div>
              <div className="p-5 border-bottom">
              
                {/* <p className="font-weight-bold">12 of 12</p> */}
                <form onSubmit={(e) => onSubmit(e)}>
                  <h4 className="font-weight-bold mb-4 mt-0">Add your phone number for verification.</h4>
                  <Alert />
                  {update ? <><label className="form-label">Phone</label><div className="row form-group">
                    {/* <div className="col-md-12 col-12">
                      <p className="text-muted font-weight-bold mb-2">Phone</p>
                    </div> */}
                      <div className="col-md-8 col-12">
                      
                        <div className="cyber-form-control">
                        <PhoneInput
                          international
                          countryCallingCodeEditable={false}
                          defaultCountry="PK"
                          placeholder="Enter phone number"
                          value={phone}
                          onChange={setValue}
                          error={phone ? (isValidPhoneNumber(phone) ? undefined : 'Invalid phone number') : 'Phone number required'} />
                        {phone && isValidPhoneNumber(phone) ? '' : <span className="error-text">Incorrect Phone Number</span>}
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <button onClick={sendCode} className="btn btn-default" disabled={!phone} >Send Code</button>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-8 mt-2 col-12">
                        <div className="form-group cyber-form-control">
                          <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Enter code"
                              name="codeBodyTextVal"
                              value={codeBodyTextVal}
                              onChange={(e) => onChange(e)} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mt-2 col-12">
                        <button onClick={codeVerify} className="btn btn-primary">Verify</button>
                      </div>
                    </div>
                    <div className="row form-group">
                    <div className="col-md-12 col-12 pt-4">
                      <p>You'll receive a text message with a verification code you can enter on the next step. Messaging rates may apply. Your phone number will <strong>not</strong> be shared with clients.</p>
                    </div>
                  </div></> : (
                    <div className="row form-group">
                      {/* <div className="col-md-12 col-12">
                        <p className="text-muted font-weight-bold mb-2">Phone</p>
                      </div> */}
                      <div className="col-md-12 col-12">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control"
                          value={phoneNumber?.phone}
                          disabled />
                      </div>
                      <div className="col-md-12 col-12 pt-4">
                          <p>Your Phone Number is Verified to Update your number click:</p>
                          <button onClick={()=>setUpdate(true)} className="btn btn-primary">Update</button>
                      </div>
                    </div>
                  )}
                  <div className="text-right">
                    {!user.type === 'Client' && <Link to="/location" className="c-btn btn-default mr-1">Back</Link>}
                    {/*<Link to="/profile" className="c-btn c-fill-color-btn">Submit Profile</Link>*/}
                    <button className="btn btn-primary" type="submit" >
                      Submit Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Phone.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth,
});


export default connect(mapStateToProp, { setAlert, addPhoneNumber, PhoneNumberVerify })(Phone);