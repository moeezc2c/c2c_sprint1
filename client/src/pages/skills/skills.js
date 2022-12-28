import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink';
// import Select from 'react-select';
import { skillsGet } from "../../actions/clientProfile";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const Skills = ({clientProfile : { skills }, skillsGet, isAuthenticated}) => {

    useEffect(() => {
        skillsGet()
     }, []);

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
                        <h3 className="text-primary">Great! What Skills does your work require?</h3>
                        <form>
                            <div className="row d-flex align-items-center form-group">
                                <div className="col-md-12 col-12 pt-3">
                                    <p className="text-muted font-weight-bold mb-2">Search skills or add your own</p>
                                </div>
                                <div className="col-md-8 col-12">
                                    {/* <input type="text" name="name" className="form-control font-weight-bold text-muted" /> */}
                                    {/*<Select
                                      isMulti
                                      name="colors"
                                      options={skills}
                                      className="basic-multi-select"
                                      classNamePrefix="select"
                                    />*/}
                                </div>
                                {/* <div className="col-md-12 col-12 pt-3">
                                    <p className="text-muted font-weight-bold mb-2">Popular skills for mobile app development </p>
                                </div>
                                <div className="col-md-8 col-12 pt-2">
                                    <button className="btn btn-sm btn-outline-primary mr-1 mt-2">Android +</button>
                                    <button className="btn btn-sm btn-outline-primary mr-1 mt-2">Phone +</button>
                                    <button className="btn btn-sm btn-outline-primary mr-1 mt-2">ios +</button>
                                    <button className="btn btn-sm btn-outline-primary mr-1 mt-2">cold calling +</button>
                                    <button className="btn btn-sm btn-outline-primary mr-1 mt-2">Wordpress +</button>
                                    <button className="btn btn-sm btn-outline-primary mr-1 mt-2">Mobile app development +</button>
                                    <button className="btn btn-sm btn-outline-primary mr-1 mt-2">Android app development +</button>
                                    <button className="btn btn-sm btn-outline-primary mr-1 mt-2">Communication +</button>
                                    <button className="btn btn-sm btn-outline-primary mr-1 mt-2">Customer Service +</button>
                                    <button className="btn btn-sm btn-outline-primary mr-1 mt-2">Lead generation +</button>
                                </div> */}
                            </div>
                            <div className="text-right">
                                <Link to="/headline" className="c-btn btn-default mr-1">Back</Link>
                                <Link to="/scope" className="c-btn c-fill-color-btn">Next: Scope</Link>
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

Skills.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  clientProfile: state.clientProfile,
});


export default connect(mapStateToProp, { skillsGet })(Skills);