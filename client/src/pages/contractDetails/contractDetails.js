import React, {useState} from "react";
import { connect, useDispatch } from "react-redux";
import { Link, Redirect, NavLink, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Icon } from 'react-icons-kit';
import { filter } from 'react-icons-kit/fa/filter';
import { Country, } from 'country-state-city';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputRange from 'react-input-range';
import {SVGLocation} from '../../components/SVG';

const ProjectDetails = ({auth: { isAuthenticated, user }}) => {
    const history = useHistory();
    const countries = Country.getAllCountries();
    const [state, setstate] = useState({
        value: { min: 2, max: 1000 }
    });
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        priceRange: "",
        location: "United Kingdom"
    });

    const { priceRange, location } = formData;

    const onChangeVal = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!isAuthenticated) {
        //return <Redirect to="/login" />;
    }

    return (<section className="main-page page-dashboard page-contract-details">
        <div className="container">

        <div className="row">
            <div className="col-lg-4 left">
            <div className="profile_info bg-white rounded shadow-sm">
                <div className="seller-card">
                    <div className="clearfix">
                        <div className="user-online-indicator is-online " data-user-id="1152855">
                            <i className="fa fa-circle"></i>online
                        </div>
                        <Link to="" className="ambassadors-badge">{user.type}</Link>
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
                    <div className="p-4">
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

                        <div className="pt-3">
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
                    </div>

                </div>
            </div>
            </div>
            <div className="col-lg-8 right">
                
                    <section className="panel-box mb-4">
                        <header className="panel-box--header">
                            <h1 className="panel-box--title">Contract Details</h1>
                        </header>
                        <main className="panel-box--body p-4">
                            {/* <h5 className="h5">Contract Details</h5>

                            <h5 className="h5">Freelancer Details</h5>

                            <h5 className="h5">Client Details</h5>

                            <h5 className="h5">Job Details</h5>

                            <h5 className="h5">Contract Progress</h5> */}
                            
                            <div className="row mb-3">
                                <div className="col-sm-2">
                                    <label for="contractType" className="col-form-label">Type</label>
                                </div>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="contractType" value={'Fixed'} readonly />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-sm-2">
                                    <label for="contractInprogress" className="col-form-label">Status</label>
                                </div>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="contractInprogress" value={'Inprogress'} readonly />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-sm-2">
                                    <label for="contractStartingDate" className="col-form-label">Starting Date</label>
                                </div>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="contractStartingDate" value={'1st Jan 2022'} readonly />
                                </div>
                            </div>

                        </main>
                    </section>


                    <section className="panel-box mb-4">
                        <header className="panel-box--header">
                            <h1 className="panel-box--title">Hiring Manager</h1>
                        </header>
                        <main className="panel-box--body p-4">
                            
                            <div className="row mb-3">
                                <div className="col-sm-2">
                                    <label for="contractManagerName" className="col-form-label">Name</label>
                                </div>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="contractManagerName" value={'Alex Jhon'} readonly />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-sm-2">
                                    <label for="contractManagerVerified" className="col-form-label">Verified</label>
                                </div>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="contractManagerVerified" value={'Yes'} readonly />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-sm-2">
                                    <label for="contractSpending" className="col-form-label">Spending</label>
                                </div>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="contractSpending" value={'$ 20000'} readonly />
                                </div>
                            </div>

                        </main>
                    </section>

                    <section className="panel-box mb-4">
                        <header className="panel-box--header">
                            <h1 className="panel-box--title">Freelancer</h1>
                        </header>
                        <main className="panel-box--body p-4">
                            
                            <div className="row mb-3">
                                <div className="col-sm-2">
                                    <label for="contractFreelancerName" className="col-form-label">Name</label>
                                </div>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="contractFreelancerName" value={'Alex Jhon'} readonly />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-sm-2">
                                    <label for="contractFreelancerVerified" className="col-form-label">Verified</label>
                                </div>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="contractFreelancerVerified" value={'Yes'} readonly />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-sm-2">
                                    <label for="contractFreelancerEarning" className="col-form-label">Earning</label>
                                </div>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="contractFreelancerEarning" value={'$ 20000'} readonly />
                                </div>
                            </div>

                        </main>
                    </section>

                    <section className="panel-box mb-4">
                        <header className="panel-box--header">
                            <h1 className="panel-box--title">Payment Details</h1>
                        </header>
                        <main className="panel-box--body p-4">

                            <table className="table table-bordered mb-4">
                                <tr>
                                    <th colSpan={2}>
                                        Pending
                                    </th>
                                </tr>
                                <tr>
                                    <td><label for="pending1" className="col-form-label">$ 200</label></td>
                                    <td>
                                        <button className="btn btn-primary btn-sm mr-2">Min</button>
                                        <button className="btn btn-primary btn-sm mr-2">Normal</button>
                                        <button className="btn btn-primary btn-sm mr-2">Max</button>
                                    </td>
                                </tr>
                            </table>

                            <table className="table table-bordered mb-4">
                                <tr>
                                    <th colSpan={2}>
                                        Approved
                                    </th>
                                </tr>
                                <tr>
                                    <td><label for="pending1" className="col-form-label">$ 200</label></td>
                                    <td>
                                        <button className="btn btn-primary btn-sm mr-2">Min</button>
                                        <button className="btn btn-primary btn-sm mr-2">Normal</button>
                                        <button className="btn btn-primary btn-sm mr-2">Max</button>
                                    </td>
                                </tr>
                            </table>

                            <table className="table table-bordered mb-4">
                                <tr>
                                    <th colSpan={2}>
                                        Disputed
                                    </th>
                                </tr>
                                <tr>
                                    <td><label for="pending1" className="col-form-label">$ 200</label></td>
                                    <td>
                                        <button className="btn btn-primary btn-sm mr-2">Min</button>
                                        <button className="btn btn-primary btn-sm mr-2">Normal</button>
                                        <button className="btn btn-primary btn-sm mr-2">Max</button>
                                    </td>
                                </tr>
                            </table>

                        </main>
                    </section>

                    <section className="panel-box mb-4">
                        <header className="panel-box--header">
                            <h1 className="panel-box--title">Job Details</h1>
                        </header>
                        <main className="panel-box--body p-4">

                        <div className="row mb-3">
                            <div className="col-sm-4">
                                <label className="col-form-label">Job Description</label>
                            </div>
                            <div className="col-sm-8">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4">
                                <label className="col-form-label">Status</label>
                            </div>
                            <div className="col-sm-8">
                                <p>Inprogress</p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4">
                                <label className="col-form-label">Type</label>
                            </div>
                            <div className="col-sm-8">
                                <p>Fixed</p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4">
                                <label className="col-form-label">Hourly Work Log</label>
                            </div>
                            <div className="col-sm-8">
                                <p>12H 26M</p>
                            </div>
                        </div>


                            <div className="table-responsive">
                                <table className="table table-bordered mb-4">
                                    <tr>
                                        <th>Description</th>
                                        <th>$</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Status</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                        </td>
                                        <td>
                                            456
                                        </td>
                                        <td>
                                            Tuesday 2/01/2022 - 12:00
                                        </td>
                                        <td>
                                            Monday 15/02/2022 - 16:00
                                        </td>
                                        <td>
                                            Completed
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        </main>
                    </section>



            </div>
        </div>

        
            
        
            
        
        </div>
    </section>);
}
ProjectDetails.propTypes = {
    isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(ProjectDetails);