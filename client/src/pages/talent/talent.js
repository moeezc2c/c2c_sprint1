import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, Redirect, NavLink, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Icon } from 'react-icons-kit';
import { filter } from 'react-icons-kit/fa/filter';
import { Country, } from 'country-state-city';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputRange from 'react-input-range';
import { freelancerAllGet } from "../../actions/freelancerProfile";
import InvitationModal from "./invitationModal";

const Talent = ({ isAuthenticated, freelancerProfile: { freelancerList } }) => {

    let history = useHistory();
    const dispatch = useDispatch();
    const [profileTalentData, setProfileTalentData] = useState([]);
    const [inviteModal,setInviteModal] = useState(false);

    const [formData, setFormData] = useState({
        priceRange: "",
        location: "United Kingdom"
    });

    const { priceRange, location } = formData;

    const onChangeVal = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [state, setstate] = useState({
        value: { min: 2, max: 1000 }
    });

    const [value, setValue] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(freelancerAllGet())
    }, []);

    useEffect(() => {
        if (freelancerList.length > 0) {
            setProfileTalentData(freelancerList.map((item => ({
                imageLink: item?.profilePhoto?.photo_link,
                name: item?.user_id?.first_name + " " + item?.user_id?.last_name,
                title: item?.expertise?.category,
                location: item?.location?.country,
                hourlyRate: item?.hourlyRate?.hourly_rate,
                skills: [item?.expertise?.skills],
                _id: item?._id,
            }))));
        }
    }, [freelancerList]);

    const countries = Country.getAllCountries();

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="main-page page-dashboard page-talent">
            <div className="container">
                <section className="bg-white rounded shadow-sm p-5 mb-3">
                {/*<Tabs defaultActiveKey="searchTab" id="uncontrolled-tab-example">*/}
                {/*<Tab eventKey="searchTab" title="Search">*/}
                
                <div className="row advanced-search">
                    <div className="col-md-10">
                        <div className="input-group search-engine">
                            <input type="text" value={value} onChange={e => setValue(e.target.value)} className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
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
                                                        onChange={value => setstate({ value })} />
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
                                                        onChange={(e) => onChangeVal(e)}>
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

                </section>
                {/*            <div className="row">
                <div className="col-md-12 border p-4 rounded">
                    <h6>Add details about your company</h6>
                    <p>Tell us about your company details to improve your match and invite your coworkers to help you hire.</p>
                    <Link to="#" className="btn btn-info">Add Details</Link>
                </div>
            </div>*/}
            <section className="bg-white rounded shadow-sm">
                {
                    profileTalentData.length > 0 && [...profileTalentData].reverse()
                        // .filter(profileTalentDataItems => {
                        //     let valueText = value.toLowerCase();
                        //     if (!valueText) return true
                        //     if (profileTalentDataItems.title.toLowerCase().includes(valueText)) {
                        //         return true
                        //     }
                        // })
                        // .filter(profileTalentDataItems => profileTalentDataItems.hourlyRate > state.value.min && profileTalentDataItems.hourlyRate < state.value.max)
                        // .filter(profileTalentDataItems => profileTalentDataItems.location == location)
                        .map(profileTalentDataItem => (
                            <div className="freelancer-list">
                                <div className="row">
                                <div className="col-md-3">
                                    <img className="img-fluid rounded-circle mb-3" src={profileTalentDataItem.imageLink} />
                                </div>
                                <div className="col-md-6 pt-1">
                                    <h3 className="text-primary mb-0">{profileTalentDataItem.name}</h3>
                                    <p className="font-weight-bold mb-0">{profileTalentDataItem.title}</p>
                                    <p className="text-muted mb-0">{profileTalentDataItem.location}</p>
                                    <p><span className="font-weight-bold">${profileTalentDataItem.hourlyRate}.00</span> / hr</p>
                                    {/*<p className="text-primary font-weight-bold"><Icon icon={fileO} /> Completed 13 SEO jobs on CyberToCyber</p>*/}
                                    {profileTalentDataItem.skills.length > 0 && <p>Has <span className="font-weight-bold">{profileTalentDataItem.skills.length} relevant skills</span> to your job</p>}
                                    <div className="tags-row mb-3">
                                        {
                                            profileTalentDataItem.skills.length > 0 && profileTalentDataItem.skills
                                                .map(profileTalentDataItemSkills => (
                                                    <span className="badge bg-secondary mr-2 mt-1">{profileTalentDataItemSkills}</span>
                                                ))}
                                        {/*<span className="border rounded pr-1 pl-1 pt-2 pb-2 ml-2 mt-1"><Link to="#" className="text-danger font-weight-bold">5 More</Link></span>*/}
                                    </div>
                                </div>
                                <div className="col-md-3 text-right">
                                    <div className="mb-2"><Link to="#" className="btn btn-default btn-sm col-md-8 mb-2 ">Hire</Link></div>
                                    <div className="mb-2"><button onClick={() => setInviteModal(true)} className="btn btn-primary btn-sm col-md-8 mb-2">Invite Job</button></div>
                                    <InvitationModal show={inviteModal} handleClose={()=>setInviteModal(false)} freelancer={profileTalentDataItem}/>
                                </div>
                            </div>
                        </div>
                        ))}
                </section>
            </div>
        </div>
    );
};

Talent.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    freelancerProfile: state.freelancerProfile,
});

export default connect(mapStateToProp)(Talent);