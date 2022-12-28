import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink'

const Headline = ({isAuthenticated}) => {

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
                        <h3 className="text-primary">Let's Start with a strong headline.</h3>
                        <p className="font-weight-bold">This helps your job post stand out to the right candidates. It's the first thing they'll see, so make it count!</p>
                        <form>
                            <div className="row d-flex align-items-center form-group">
                                <div className="col-md-12 col-12">
                                    <p className="text-muted font-weight-bold mb-2">Write a headline for your job post</p>
                                </div>
                                <div className="col-md-8 col-12">
                                    <input type="text" name="name" className="form-control font-weight-bold text-muted" />
                                </div>
                                <div className="col-md-12 col-12 pt-4">
                                    <p className="font-weight-bold">Example titles</p>
                                    <ul>
                                        <li>Facebook ad specialist needed for products launch.</li>
                                        <li>Graphics designer needed to design ad creative for multiple campaigns</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="text-right">
                                <Link to="/skills" className="c-btn c-fill-color-btn">Next: Skills</Link>
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

Headline.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProp)(Headline);