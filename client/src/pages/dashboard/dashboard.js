import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const Dashboard = ({ auth: { isAuthenticated, user } }) => {
    const history = useHistory();
    useEffect(() => {
        if (isAuthenticated && user.type === 'Admin') {
            history.push('/adminDashboard');
        }
    },[user])
  return (
    <React.Fragment>
      <div className="main-page page-dashboard">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 left">
                    <div className="profile_info bg-white rounded shadow-sm">
                        <div className="seller-card">
                            <div className="clearfix">
                                <div className="user-online-indicator is-online " data-user-id="1152855">
                                    <i className="fa fa-circle"></i>online
                                </div>
                                {/*}<Link to="" className="ambassadors-badge">Freelancer</Link>{*/}
                                <Link to="" className="ambassadors-badge">User</Link>
                            </div>
                            <div className="user-profile-info">

                                <div className="user-profile-image">
                                    <label className="user-pict rounded-circle">
                                        <Link to="" className="user-badge">
                                            <h3 className="text-uppercase">{user.first_name.slice(0,1)}{user.last_name.slice(0,1)}</h3>
                                        </Link>
                                    </label>
                                </div>

                                <div className="user-profile-label">
                                    <div className="username-line">
                                        <Link to="" className="seller-link">{user.first_name} {user.last_name}</Link>
                                    </div>
                                    <div className="oneliner-wrapper">
                                        <small className="oneliner">Expert in Cyber Security</small>
                                        <div className="ratings-wrapper">
                                            <p className="rating-text"><strong>5.0</strong> (1k+ reviews)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <section className="p-4">
                            <div className="border-bottom pb-4">
                                <div className="d-flex align-items-center py-1">
                                    Response Rate
                                    <div className="font-weight-bold ml-auto d-flex align-items-center">
                                        <span className="btn btn-primary border-0 py-1 px-4 mr-2"></span> 100%
                                    </div>
                                </div>
                                <div className="d-flex align-items-center py-1">
                                    Delivered on Time
                                    <div className="font-weight-bold ml-auto d-flex align-items-center">
                                        <span className="btn btn-primary border-0 py-1 px-4 mr-2"></span> 100%
                                    </div>
                                </div>
                                <div className="d-flex align-items-center py-1">
                                    Order Completion
                                    <div className="font-weight-bold ml-auto d-flex align-items-center">
                                        <span className="btn btn-primary border-0 py-1 px-4 mr-2"></span> 100%
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4">
                                <div className="d-flex align-items-center py-1 h6">
                                    Earned in March
                                    <div className="font-weight-bold ml-auto d-flex align-items-center">
                                        $2334
                                    </div>
                                </div>
                                <div className="d-flex align-items-center py-1 h6">
                                    Response Time
                                    <div className="font-weight-bold ml-auto d-flex align-items-center">
                                        N/A
                                    </div>
                                </div>
                            </div>
                            </section>

                        </div>
                    </div>
                </div>


                <div className="col-lg-8 right">
                    <div className="d-flex align-items-center p-3 bg-white rounded shadow-sm">
                        <h5 className="h5 m-0">Active orders</h5>
                        <div className="ml-auto d-flex align-items-center text-muted">
                            <h5 className="h5 m-0 text-secondary">15 ($5000)</h5>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded shadow-sm my-3">
                        <h5 className="mb-3">How to build your success on Cyber2Cyber in 3 steps</h5>
                        <p className="m-0">The key to your success on Cyber2Cyber is the brand you build for yourself through your Cyber2Cyber reputation. We gathered some tips and resources to help you become a leading seller on Cyber2Cyber.
                        </p>
                    </div>
                    <div className="p-4 bg-white rounded shadow-sm mb-3 step-for-best-seller">
                        <h5 className="mb-4">Take these steps to become a top seller on Cyber2Cyber
                        </h5>
                        <div className="row">
                            <div className="col-lg-4 dashboard-box">
                                <div className="display-4 my-2">
                                    <img src="assets/images/bell.png" alt=""/>
                                    {/* <i className="fa fa-volume-up text-primary" aria-hidden="true"></i> */}
                                </div>
                                <h5 className="font-weight-bold text-primary">Get noticed</h5>
                                <p className="text-muted">Hone your skills and expand your knowledge with online courses. You’ll be able to offer more services and <b>gain more exposure</b> with every course completed.
                                </p>
                                <button className="btn btn-secondary btn-block" type="submit"> Share Your Gigs </button>
                            </div>

                            <div className="col-lg-4 dashboard-box">
                                <div className="display-4 my-2">
                                    {/* <i className="fa fa-book text-primary" aria-hidden="true"></i> */}
                                    <img src="assets/images/more-skills.png" alt=""/>
                                </div>
                                <h5 className="font-weight-bold text-primary">Get more skills & exposure</h5>
                                <p className="text-muted">Watch this free online course to learn how to create an outstanding service experience for your buyer and grow your career as an online freelancer.
                                </p>
                                <button className="btn btn-secondary btn-block" type="submit"> Explore Learn </button>
                            </div>

                            <div className="col-lg-4 dashboard-box">
                                <div className="display-4 my-2">
                                    {/* <i className="fa fa-star text-primary" aria-hidden="true"></i> */}
                                    <img src="assets/images/best-seller2.png" alt=""/>
                                </div>
                                <h5 className="font-weight-bold text-primary">Become a successful seller!</h5>
                                <p className="text-muted">Hone your skills and expand your knowledge with online courses. You’ll be able to offer more services and <b>gain more exposure</b> with every course completed.
                                </p>
                                <button className="btn btn-secondary btn-block" type="submit"> Watch Free Course </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
