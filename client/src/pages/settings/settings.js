import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link, Redirect, NavLink } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { facebookSquare } from 'react-icons-kit/fa/facebookSquare';
import { linkedinSquare } from 'react-icons-kit/fa/linkedinSquare';
import { mapMarker } from 'react-icons-kit/fa/mapMarker';
import { userO } from 'react-icons-kit/fa/userO';
import { clockO } from 'react-icons-kit/fa/clockO';
import { paperPlane } from 'react-icons-kit/fa/paperPlane';

const Settings = ({ auth: { isAuthenticated, user } }) => {

    const [formDataSetting, setFormDataSetting] = useState({
        full_name: user.first_name + " " + user.last_name,
        email: user.email,
    });

    const { full_name, email } = formDataSetting;

    const onChange = (e) => {
        setFormDataSetting({ ...formDataSetting, [e.target.name]: e.target.value });
    };

    return (
            <section className="main-page page-dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bg-white rounded shadow-sm sidebar-page-right">
                                <div>
                                    <div className="p-3 border-bottom">
                                        <form>
                                            <div className="row d-flex align-items-center form-group">
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold mb-0">FULL NAME</p>
                                                </div>
                                                <div className="col-md-8">
                                                    <input
                                                        type="text"
                                                        name="full_name"
                                                        className="form-control font-weight-bold text-muted"
                                                        value={full_name}
                                                        onChange={(e) => onChange(e)} />
                                                </div>
                                            </div>
                                            <div className="row d-flex align-items-center form-group">
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold mb-0">EMAIL</p>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="email"
                                                        name="email"
                                                        className="form-control font-weight-bold text-muted"
                                                        value={email}
                                                        onChange={(e) => onChange(e)} />
                                                </div>
                                            </div>
                                            <div className="row d-flex align-items-center form-group">
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold mb-0">ONLINE STATUS <span className="ml-2 small"><i className="fa fa-circle text-primary" aria-hidden="true"></i></span></p>
                                                    <p className="text-muted">When online, your Gigs are visible under the Online search filter.</p>
                                                </div>
                                                <div className="col-md-8">
                                                    <select className="form-control">
                                                        <option>Go Offline for...</option>
                                                        <option>1 hour</option>
                                                        <option>1 day</option>
                                                        <option>1 week</option>
                                                        <option>forever</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <button className="btn btn-primary">Save Changes</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="p-3">
                                        <form>
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold mb-0">ACCOUNT DEACTIVATION</p>
                                                </div>
                                                <div className="col-md-8">
                                                    <p className="text-muted">What happens when you deactivate your account?</p>
                                                    <dl className="text-muted">
                                                        <li>Your profile and Gigs won't be shown on Cyber2Cyber anymore. <span data-toggle="tooltip" data-placement="top" title="People who will try to view your profile or Gigs will get an 'Unavailable Page' message."><i className="fa fa-question-circle" aria-hidden="true"></i></span></li>
                                                        <li>Active orders will be cancelled.
                                                            <span data-toggle="tooltip" data-placement="top" title="Not including delivered orders."> </span>
                                                            <i className="fa fa-question-circle" aria-hidden="true"></i></li>
                                                        <li>You won't be able to re-activate your Gigs.</li>
                                                    </dl>
                                                </div>
                                            </div>
                                            <div className="row d-flex align-items-center form-group">
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold mb-0">I'm leaving because...</p>
                                                </div>
                                                <div className="col-md-8">
                                                    <select className="form-control">
                                                        <option>Choose a reason</option>
                                                        <optgroup label="Account" issues="">
                                                            <option>Unsubscribe from Cyber2Cyber emails</option>
                                                            <option>I want to change my username</option>
                                                            <option>I have another Cyber2Cyber account</option>
                                                            <option>Other</option>
                                                        </optgroup>
                                                        <optgroup label="Buying" issues="">
                                                            <option>I can't find what I need on Cyber2Cyber</option>
                                                            <option>Cyber2Cyber is complicated or hard to use</option>
                                                            <option>Negative experience with seller/s</option>
                                                            <option>I'm unhappy with Cyber2Cyber's policies</option>
                                                            <option>Other</option>
                                                        </optgroup>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold mb-0">Tell us more (optional)</p>
                                                </div>
                                                <div className="col-md-8">
                                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="7" placeholder="Help us become better..."></textarea>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <button className="btn btn-primary">Deactivate Account</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="bg-white rounded shadow-sm sidebar-page-right">
                                <div>
                                    <div className="p-3 border-bottom">
                                        <form>
                                            <p className="text-muted font-weight-bold">CHANGE PASSWORD</p>
                                            <div className="row d-flex align-items-center form-group">
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold mb-0">Current Password</p>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="password" name="current-pass" className="form-control font-weight-bold text-muted" />
                                                </div>
                                            </div>
                                            <div className="row d-flex align-items-center form-group">
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold mb-0">New Password</p>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="password" name="new-pass" className="form-control font-weight-bold text-muted" />
                                                </div>
                                            </div>
                                            <div className="row d-flex align-items-center form-group">
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold mb-0">Confirm Password</p>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="password" name="new-pass" className="form-control font-weight-bold text-muted" />
                                                    <p className="text-muted pt-2">8 characters or longer. Combine upper and lowercase letters and numbers.</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <button className="btn btn-primary">Save Changes</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="p-3 border-bottom">
                                        <form>
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold mb-0">PHONE VERIFICATION</p>
                                                </div>
                                                <div className="col-md-8">
                                                    <p className="text-muted">Your phone is not verified with Cyber2Cyber. Click Verify Now to complete phone verification</p>
                                                    <p className="text-right"><a href="#" className="btn btn-primary">Verify Now</a></p>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold mb-0">SECURITY QUESTION</p>
                                                </div>
                                                <div className="col-md-8">
                                                    <p className="text-muted">By creating a security question, you will add an additional layer of protection for your revenue withdrawals and for changing your password.</p>
                                                    <p className="text-right"><a href="#" className="btn btn-primary">Set</a></p>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold mb-0">TWO FACTOR AUTHENTICATION</p>
                                                    <span className="small font-weight-bold text-primary">RECOMMENDED</span>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="custom-control custom-switch">
                                                        <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                                                        <label className="custom-control-label" htmlFor="customSwitch1"></label>
                                                    </div>
                                                    <p className="text-muted">To help keep your account secure, we'll ask you to submit a code when using a new device to log in. We'll send the code via email or Cyber2Cyber notification. <a href="#" className="text-primary">Verify your mobile phone</a> to be able to receive the code via SMS.</p>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="p-3">
                                        <p className="text-muted font-weight-bold mb-0">CONNECTED DEVICES</p>
                                        <div className="d-flex align-items-center p-4 border rounded mt-3">
                                            <div className="icon">
                                                <h3 className="mb-0"><i className="fa fa-laptop" aria-hidden="true"></i></h3>
                                            </div>
                                            <div className="text ml-4">
                                                <p className="h6 font-weight-bold text-muted">Chrome 85, Windows <span className="text-primary small font-weight-bold">THIS DEVICE</span></p>
                                                <p className="mb-0 text-muted">Last Activity 49 Minutes Ago • Karachi, Pakistan</p>
                                            </div>
                                            <div className="ml-auto sign-out">
                                                <p className="h6 font-weight-bold"><a href="" className="text-primary">Sign Out</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="bg-white rounded shadow-sm sidebar-page-right">
                                <div>
                                    <div className="p-3 border-bottom">
                                        <form>
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold h6 mb-3">NOTIFICATIONS</p>
                                                    <p className="text-muted mb-0">For important updates regarding your Cyber2Cyber activity, certain notifications cannot be disabled.</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold h6 mb-3">TYPE</p>
                                                    <p className="text-muted font-weight-bold">Inbox Messages</p>
                                                    <p className="text-muted font-weight-bold">Order Messages</p>
                                                    <p className="text-muted font-weight-bold">Order Updates</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold h6 mb-3">Email</p>
                                                    <div className="form-check ml-4 mb-3">
                                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" checked />
                                                        <label className="form-check-label" htmlFor="inlineCheckbox1"></label>
                                                    </div>
                                                    <div className="form-check ml-4 mb-3">
                                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" checked />
                                                        <label className="form-check-label" htmlFor="inlineCheckbox2"></label>
                                                    </div>
                                                    <div className="form-check ml-4">
                                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" checked />
                                                        <label className="form-check-label" htmlFor="inlineCheckbox3"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="p-3">
                                        <form>
                                            <p className="text-muted font-weight-bold mb-0">REAL-TIME NOTIFICATIONS <span data-toggle="tooltip" data-placement="right" title="This includes inbox messages, order updates, account updates, etc."><i className="fa fa-question-circle" aria-hidden="true"></i></span></p>
                                            <div className="row pt-3">
                                                <div className="col-md-4">
                                                    <p className="text-muted font-weight-bold">Enable/disable real-time notifications</p>
                                                    <p className="text-muted font-weight-bold">Enable/disable sound</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <p>
                                                        <div className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id="customSwitch3" />
                                                            <label className="custom-control-label" htmlFor="customSwitch1"><a href="#" className="text-primary">Try Me!</a></label>
                                                        </div>
                                                    </p>
                                                    <p>
                                                        <div className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id="customSwitch4" checked />
                                                            <label className="custom-control-label" htmlFor="customSwitch2"><i className="fa fa-volume-up" aria-hidden="true"></i></label>
                                                        </div>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <button className="btn btn-primary">Save Changes</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )

}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Settings);