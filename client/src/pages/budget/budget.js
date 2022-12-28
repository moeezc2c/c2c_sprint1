import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink'

const Budget = ({isAuthenticated}) => {

   if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
             <UserProfileNavLink />
          </div>
          <div className="col-lg-9">
             <div className="bg-white rounded shadow-sm sidebar-page-right">
              <div>
                  <div className="p-5 border-bottom">
                      <h3 className="text-primary">Almost done! Tell us about your budget.</h3>
                      <p className="font-weight-bold">This will help us match you to talent within your range.</p>
                      <form>
                          <div className="row d-flex align-items-center form-group pt-3">
                              <div className="col-md-5 col-12 border border-dark rounded p-3">
                                  <input type="radio" name="budgetradio" checked /><span className="font-weight-bold ml-2">Hourly Rate</span><i className="fa fa-clock-o fa-fw" aria-hidden="true"></i>
                              </div>
                              {/* <div className="col-md-5 col-12 border border-dark rounded p-3 ml-md-5">
                                  <input type="radio" name="budgetradio" /><span className="font-weight-bold ml-2">Project budget</span><i className="fa fa-usd fa-fw" aria-hidden="true"></i>
                              </div> */}
                          </div>
                          <div className="row d-flex align-items-center form-group pt-3 mb-0">
                              <div className="col-md-5 col-12 p-3">
                                  <p className="font-weight-bold mb-1">From</p>
                                  <div className="row">
                                      <div className="col-md-5">
                                          <input type="number" className="form-control" placeholder="$" />
                                      </div>
                                      <div className="col-md-7 p-0 pt-1">
                                          <p>/hour</p>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-5 col-12 p-3">
                                  <p className="font-weight-bold mb-1">To</p>
                                  <div className="row">
                                      <div className="col-md-5">
                                          <input type="number" className="form-control" placeholder="$" />
                                      </div>
                                      <div className="col-md-7 p-0 pt-1">
                                          <p>/hour</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="row d-flex form-group p-0">
                              <div className="col-md-12 col-12">
                                  <p>This is the average rate for similar projects.</p>
                              </div>
                          </div>
                          <div className="row d-flex form-group p-0">
                              <div className="col-md-12 col-12">
                                  <p>Professionals tend to charge $24 - $45/hour (USD) for mobile app development projects like yours.</p>
                              </div>
                          </div>
                          <div className="text-right">
                              <Link to="/scope" className="c-btn btn-default mr-1">Back</Link>
                              <Link to="/postjobclient" className="c-btn c-fill-color-btn">Next: Post Job</Link>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Budget.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProp)(Budget);