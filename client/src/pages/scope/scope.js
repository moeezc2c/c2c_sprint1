import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink'

const Scope = ({isAuthenticated}) => {

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
                        <h3 className="text-primary">Next, Estimate the scope of your work.</h3>
                        <p className="font-weight-bold">Consider the size of your project and the time it will take.</p>
                        <form>
                            <div className="row d-flex align-items-center form-group">
                                <div className="col-md-8 col-12">
                                    <input type="radio" name="scopetype" /><span className="font-weight-bold ml-2">Large</span>
                                    <p>Longer term or complex initiatives ( ex. design and build a full website)</p>
                                </div>
                                <div className="col-md-8 col-12">
                                    <input type="radio" name="scopetype" /><span className="font-weight-bold ml-2">Medium</span>
                                    <p>well-defined projects ( ex. a landing page)</p>
                                </div>
                                <div className="col-md-8 col-12">
                                    <input type="radio" name="scopetype" /><span className="font-weight-bold ml-2">Small</span>
                                    <p>Quick and straightforward tasks ( ex. updates text and images on a webpage)</p>
                                </div>
                                <div className="col-md-8 col-12">
                                    <p className="font-weight-bold">How long will your work take?</p>
                                    <ul>
                                        <li><input type="radio" name="workTime" /><span className=" ml-1">More than 6 months</span></li>
                                        <li><input type="radio" name="workTime" /><span className=" ml-1">3 to 6 months</span></li>
                                        <li><input type="radio" name="workTime" /><span className=" ml-1">1 to 3 months</span></li>
                                    </ul>
                                </div>
                                <div className="col-md-8 col-12">
                                    <p className="font-weight-bold mb-0 mt-3">What level of experience will it need?</p>
                                    <p>This won't restrict any proposals, but helps match expertise to your budget.</p>
                                    <ul>
                                        <li><input type="radio" name="experienceLevel" /><span className=" ml-1">Entry</span></li>
                                        <li><input type="radio" name="experienceLevel" /><span className=" ml-1">Intermediate</span></li>
                                        <li><input type="radio" name="experienceLevel" /><span className=" ml-1">Expert</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="text-right">
                                <Link to="/skills" className="c-btn btn-default mr-1">Back</Link>
                                <Link to="/budget" className="c-btn c-fill-color-btn">Next: Budget</Link>
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

Scope.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProp)(Scope);