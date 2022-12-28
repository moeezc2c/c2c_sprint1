import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

class UserProfileNavLink extends React.Component {

    render() {
        const userType = this.props.auth.user.type;
        let NavLinksItem;
        if (userType == "Freelancer") {
            NavLinksItem = (
                <div className="dropdown-menu-show">
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/expertise">Expertise</NavLink>
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/expertiselevel">Expertise Level</NavLink>
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/education">Education</NavLink>
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/certificate">Certificate</NavLink>
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/employment">Employment</NavLink>
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/languages">Languages</NavLink>
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/hourlyrate">Hourly Rate</NavLink>
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/titleandoverview">Title & Overview</NavLink>
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/profileandphoto">Profile & Photo</NavLink>
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/location">Location</NavLink>
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/phone">Phone</NavLink>
                </div>
              )
        } else {
            NavLinksItem = (
                <div className="dropdown-menu-show">
                    {/*<NavLink className="dropdown-item py-2" activeClassName="active" to="/headline">Headline</NavLink>
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/skills">Skills</NavLink>
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/scope">Scope</NavLink>
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/budget">Budget</NavLink>*/}
                    {/* <NavLink className="dropdown-item py-2" activeClassName="active" to="/postjobclient">Post Job</NavLink> */}
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/clientcompleteprofile">Profile</NavLink>
                    <NavLink className="dropdown-item py-2" activeClassName="active" to="/phone">Phone</NavLink>
                </div>
            );
        }
        return(
            <div className="bg-white rounded shadow-sm overflow-hidden sidebar-fix mb-3">
                 {NavLinksItem}
            </div>
        );
    }
}

const mapStateToProp = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProp)(UserProfileNavLink);