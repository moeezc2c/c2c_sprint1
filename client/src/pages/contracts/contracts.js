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

const ContractDetails = ({auth: { isAuthenticated, user }}) => {
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
                <section className="bg-white rounded shadow-sm p-5 mb-3">
                    <main>
                    <div className="row advanced-search">
                                <div className="col-md-10">
                                    <div className="input-group search-engine">
                                        <input type="text" value={value} onChange={()=>{}} className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                                        <div className="input-group-prepend">
                                            <Link to="#" className="btn btn-primary text-light" id="basic-addon1"><i className="fa fa-search fa-fw p-0" aria-hidden="true"></i></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 pl-0">
                                    <Button onClick={handleShow} className="btn-filter btn btn-block"><Icon icon={filter} /> Filters</Button>
                                    <Modal show={show} size="sm" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Search Talent</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group cyber-form-control">
                                                            <label className="form-label mb-3">Hourly Rate Range</label>
                                                            <div className="mt-2">
                                                                <InputRange
                                                                    maxValue={10000}
                                                                    minValue={10}
                                                                    value={state.value}
                                                                    onChange={()=>{}} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-12 mt-3">
                                                        
                                                        <div className="form-group cyber-form-control">
                                                            <label className="form-label">Country/Location</label>
                                                            <div className="input-group mb-3">
                                                                <select className="form-control"
                                                                    name="location"
                                                                    value={location}
                                                                    onChange={()=>{}}>
                                                                    <option>Please Select</option>
                                                                    {
                                                                        countries.map(item => <option value={item.name} data-isoCode={item.isoCode}>{item.name}</option>)
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="primary" onClick={handleClose}>
                                                Search
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                        </main>
                    </section>
                    <section className="panel-box">
                        <header className="panel-box--header">
                            <h1 className="panel-box--title">Contract Details</h1>
                        </header>
                        <main className="panel-box--body p-0">
                            {/* <h5 className="h5">Contract Details</h5>

                            <h5 className="h5">Freelancer Details</h5>

                            <h5 className="h5">Client Details</h5>

                            <h5 className="h5">Job Details</h5>

                            <h5 className="h5">Contract Progress</h5> */}
                            <div className="border-bottom p-4 posted-jobs">
                                    <div className="pt-1">

                                        <div className="row">
                                            <div className="col-md-12">
                                                <span onClick={() =>{}} className="cursorClass">
                                                    <h4 className="h4 mt-0 mb-3">Quia delectus volup</h4>
                                                    <div className="text-gray">
                                                        <div className="mb-2 list-detail-items">
                                                           <ul>
                                                            <li><strong>Budget</strong> $7777 / hr</li>
                                                            <li><strong>Posted</strong> 2022-05-21</li>
                                                           </ul>
                                                        </div>
                                                        <p className="mb-3">Ullamco ipsum enim</p>                                                    
                                                        <strong><SVGLocation/></strong> 
                                                        <span className="text-muted">Equatorial Guinea</span>
                                                    </div>
                                                </span>
                                            </div>                                            
                                        </div>                                        
                                        
                                    </div>
                                </div>
                        </main>
                    </section>
            </div>
        </div>

        
            
        
            
        
        </div>
    </section>);
}
ContractDetails.propTypes = {
    isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(ContractDetails);