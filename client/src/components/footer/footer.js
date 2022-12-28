import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { Icon } from 'react-icons-kit';
import {facebook} from 'react-icons-kit/fa/facebook';
import {linkedin} from 'react-icons-kit/fa/linkedin';
import {twitter} from 'react-icons-kit/fa/twitter'
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink';
import {SVGFooterLogo, SVGSocial} from '../SVG';

const Footer = (props) => {
  return (<>
    <footer className={`main-footer ${props.type==3 ? 'light' : ''} ${props.type==2 ? 'dark' : ''} `}>
        <div className="container-fluid">
            <div className="row justify-content-between main-footer--content">
                <div className="col col-md-2_ col-lg-2_ col-xl-2_ col-xxl-2_">
                    <div className="footer-logo">
                        <Link to="index.html">
                            {/* <img src="assets/images/logo-footer.svg" /> */}
                            <SVGFooterLogo/>
                        </Link>
                        <span className="logo-bottom-line">&nbsp;</span>

                        <ul className="social-icons">
                            <li><Link to="#"><SVGSocial icon={`linkedIn`}/></Link></li>
                            <li><Link to="#"><SVGSocial icon={`facebook`}/></Link></li>
                            <li><Link to="#"><SVGSocial icon={`twitter`}/></Link></li>
                        </ul>

                    </div>
                </div>
                <div className="col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                    <div className="d-flex justify-content-between">
                        <div className="footer-list">
                            <h2>Customers</h2>
                            <ul className="list">
                                <li><Link to="#">How to find experts</Link></li>
                                <li><Link to="#">Top rated experts</Link></li>
                                <li><Link to="#">Hire Teams</Link></li>
                                <li><Link to="/qa">FAQs</Link></li>
                            </ul>
                        </div>
                        <div className="footer-list">
                            <h2>Experts</h2>
                            <ul className="list">
                                <li><Link to="#">How to find work</Link></li>
                                <li><Link to="#">Contracts and fixed payments models</Link></li>
                                <li><Link to="#">How to maximize earning</Link></li>
                                <li><Link to="/qa">FAQ's</Link></li>
                            </ul>
                        </div>
                        <div className="footer-list">
                            <h2>About</h2>
                            <ul className="list">
                                <li><Link to="#">About Us</Link></li>
                                <li><Link to="#">Help &amp; Support</Link></li>
                                <li><Link to="#">Contact Us</Link></li>
                                <li><Link to="#">Site Map</Link></li>
                            </ul>
                        </div>
                        <div className="footer-list">
                            <h2>Terms and Conditions</h2>
                            <ul className="list">
                                <li><Link to="/coc">Code of Conduct</Link></li>
                                <li><Link to="/feeAndCharges">Fees and Charges</Link></li>
                                <li><Link to="/privacyPolicy">Privacy Policy</Link></li>
                                <li><Link to="/copyright">Copyright Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>                
            </div>
            
            {/* <hr/> */}

            
        </div>
        <div className="copyright">
            <div className="container-fluid">
                <p>&copy; Copyright 2022 Cyber2Cyber. All Rights Reserved</p>
            </div>
        </div>
    </footer>
    </>
  );
};


export default connect()(Footer);