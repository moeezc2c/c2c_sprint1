import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink, useHistory } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink';
import Alert from '../../components/alert/Alert';
import { addHourlyRate } from "../../actions/freelancerProfile";

const HourlyRate = ({ freelancerProfile : { hourlyRate } , setAlert, addHourlyRate, isAuthenticated}) => {

     let youReceive = 0;

     const [formData , setFormData] = useState({
      hourly_rate: ""
     });

     const [youReceiveVal, setYouReceiveVal] = useState();

     useEffect(() => {
      setFormData(hourlyRate);
      youReceive = hourlyRate.hourly_rate * 0.2;
      setYouReceiveVal(hourlyRate.hourly_rate - youReceive);
     }, []);

      const { hourly_rate } = formData;

      const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      youReceive = e.target.value * 0.2;
      setYouReceiveVal(e.target.value - youReceive);
    };

  let history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    addHourlyRate({
      hourly_rate
    });
    history.push("/titleandoverview");
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
                <div className="p-5 border-bottom">
                  <h3 className="text-primary">Hourly Rate</h3>
                  <p className="font-weight-bold">7 of 11</p>
                    <form onSubmit={(e) => onSubmit(e)}>
                      <p className="font-weight-bold">Our customers will see these rates when your profile matches their requirements. Make sure you create an impression.</p>
                        <div className="row d-flex align-items-center form-group">
                            <div className="col-md-12 col-12">
                                <p className="text-dark font-weight-bold mb-2">Hourly Rate</p>
                                <p className="text-muted mb-2">Total amount the client will see</p>
                            </div>
                            <div className="col-md-8 col-12">
                              <input type="text" className="form-control" placeholder="$ 0.00 / hr"
                              name="hourly_rate"
                              value={hourly_rate}
                              onChange={(e) => onChange(e)} />
                            </div>
                            <div className="col-md-12 col-12 mt-3">
                                <p className="text-dark font-weight-bold mb-1">Cyber2Cyber Service Fee</p>
                                <p className="text-muted mb-2">The Cyber2Cyber Service Fee is 20% when you begin a contract with a new client. Once you bill over $500 with your client, the fee will be 10%</p>
                            </div>
                            <div className="col-md-8 col-12">
                              <input type="text" className="form-control" placeholder="20%" readOnly />
                            </div>
                            <div className="col-md-12 col-12 mt-3">
                                <p className="text-dark font-weight-bold mb-1">You'll receive</p>
                                <p className="text-muted mb-2">The estimated amount you'll receive after service fees</p>
                            </div>
                            <div className="col-md-8 col-12">
                              <input type="text" className="form-control" placeholder="$ 0.00 / hr" readOnly
                              name="youReceiveVal"
                              value={youReceiveVal} />
                            </div>
                            {/*<div className="col-md-8 col-12 pt-4">
                              <p className="font-weight-bold">What skills do you offer clients?</p>
                              <input type="text" className="form-control" placeholder="Enter at least 1 skill e.g Cyber Security, Mobile Cyber Security" />
                            </div>*/}
                            <div className="col-md-12 col-12 mt-4">
                              
                            </div>
                        </div>


                        <div className="row justify-content-center">
                          <div className="col">
                          <Link to="/titleandoverview" className="btn btn-normal">Skip this step</Link>
                          </div>
                          <div className="col text-right">
                            <Link to="/languages" className="btn btn-default mr-1">Back</Link>
                            <button className="btn btn-primary" type="submit" >
                                Next: Title & Overview
                            </button>
                          </div>
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

HourlyRate.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  freelancerProfile: state.freelancerProfile
});


export default connect(mapStateToProp, { setAlert, addHourlyRate })(HourlyRate);