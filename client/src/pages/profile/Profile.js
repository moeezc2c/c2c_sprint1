import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import {facebookSquare} from 'react-icons-kit/fa/facebookSquare';
import {linkedinSquare} from 'react-icons-kit/fa/linkedinSquare';
import {mapMarker} from 'react-icons-kit/fa/mapMarker';
import {userO} from 'react-icons-kit/fa/userO';
import {clockO} from 'react-icons-kit/fa/clockO';
import {paperPlane} from 'react-icons-kit/fa/paperPlane';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReactStars from "react-rating-stars-component";


const Profile = ({ freelancerProfile : { expertise, expertLevel, employment, certification, languageVal, education, hourlyRate, Location, TitleAndOverview, profileAndPhoto, phoneNumber } , auth: { isAuthenticated, user } }) => {
    if (expertise.skills == "")
    {
        //console.log("in");
        expertise = JSON.parse(localStorage.getItem('expertise'));
        expertLevel = JSON.parse(localStorage.getItem('expertLevel'));
        employment = JSON.parse(localStorage.getItem('employment'));
        certification = JSON.parse(localStorage.getItem('certification'));
        languageVal = JSON.parse(localStorage.getItem('languageVal'));
        education = JSON.parse(localStorage.getItem('education'));
        hourlyRate = JSON.parse(localStorage.getItem('hourlyRate'));
        Location = JSON.parse(localStorage.getItem('location'));
        TitleAndOverview = JSON.parse(localStorage.getItem('titleAndOverview'));
        profileAndPhoto = JSON.parse(localStorage.getItem('profilePhoto'));
        phoneNumber = JSON.parse(localStorage.getItem('phoneNumber'));
        user = JSON.parse(localStorage.getItem('user'));

    }
    else
    {
        //console.log("out");
        localStorage.setItem('expertise', JSON.stringify(expertise));
        localStorage.setItem('expertLevel', JSON.stringify(expertLevel));
        localStorage.setItem('employment', JSON.stringify(employment));
        localStorage.setItem('certification', JSON.stringify(certification));
        localStorage.setItem('languageVal', JSON.stringify(languageVal));
        localStorage.setItem('education', JSON.stringify(education));
        localStorage.setItem('hourlyRate', JSON.stringify(hourlyRate));
        localStorage.setItem('location', JSON.stringify(Location));
        localStorage.setItem('titleAndOverview', JSON.stringify(TitleAndOverview)); 
        localStorage.setItem('profilePhoto', JSON.stringify(profileAndPhoto)); 
        localStorage.setItem('phoneNumber', JSON.stringify(phoneNumber));
        localStorage.setItem('user', JSON.stringify(user));
       
    }

    const [ratingText , setRatingText] = useState({
        ratingTextData: "",
      });

    const {ratingTextData} = ratingText;

    const [show, setShow] = useState(false);

    const [showGetAQuote, setShowGetAQuote] = useState(false);

    const [showReview, setShowReview] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseGetAQuote = () => setShowGetAQuote(false);
    const handleShowGetAQuote = () => setShowGetAQuote(true);

    const handleCloseReview = () => setShowReview(false);
    const handleShowReview = () => setShowReview(true);

    const ratingChanged = (newRating) => {
      setRatingText(newRating);
    };

    return (
        <section className="main-page page-dashboard">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 left">
                    <div className="profile_info bg-white rounded shadow-sm">
                        <div className="seller-card">
                            <div className="clearfix">
                                <div className="user-online-indicator is-online " data-user-id="1152855">
                                    <i className="fa fa-circle"></i>{expertLevel.expert_level ? expertLevel.expert_level : 'Online'} 
                                </div>
                                <Link to="" className="ambassadors-badge">{user.type}</Link>
                            </div>
                            <div className="user-profile-info">
                                <div>
                                    <div className="user-profile-image">
                                        <label className="user-pict rounded-circle">
                                            {/*<img
                                                src="assets/images/BilalAhmedProfile.jpg"
                                                className="img-fluid user-pict-img" alt="Cyber2Cyber" />*/}
                                            <Link to="" className="user-badge user-badge-round user-badge-round-med locale-en-us top-rated-seller">
                                           
                                                {
                                                    profileAndPhoto.photo_link ?
                                                        <img src={profileAndPhoto.photo_link} alt="Profile picture" />
                                                    :
                                                    <h3 className="text-uppercase profile-avatar">{user.first_name.slice(0,1)}{user.last_name.slice(0,1)}</h3>
                                                }  
                                            </Link>
                                    </label>
                                    </div>
                                </div>
                                <div className="user-profile-label">
                                    <div className="username-line">
                                        <Link to="" className="seller-link">{user.first_name} {user.last_name}</Link>
                                    </div>
                                    <div className="oneliner-wrapper">
                                        <small className="oneliner">{TitleAndOverview.title}</small>
                                        <div className="ratings-wrapper">
                                            {/*<p className="rating-text"><strong>5.0</strong> (1k+ reviews)</p>*/}
                                            <p className="rating-text"><strong>${hourlyRate.hourly_rate}</strong>/hr</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='p-4'>
                                <div className="buttons-wrapper row mb-2">
                                    <div className="col">
                                    <Button onClick={handleShow} className="btn-lrg-standard btn-contact-me js-contact-me js-open-popup-join btn-block">Contact
                            Me</Button>
                                    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Contact Information</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <p><span className="font-weight-bold">Email:</span> {user.email}</p>
                                                        <p><span className="font-weight-bold">Contact No:</span> {phoneNumber.phone} {(phoneNumber.verified == "no") ? "Unverified" : "Verified" }</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    </div>
                                    <div className="col">
                                    <Button onClick={handleShowGetAQuote} className="btn-lrg-standard btn-white btn-custom-order btn-block">Get a Quote</Button>
                                    <Modal show={showGetAQuote} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleCloseGetAQuote}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Get A Quote</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <p>Enter berif description about your work, I will reply you once I got your quote.</p>
                                                        <p>
                                                            <textarea className="p-2" name="" cols="50" rows="10"></textarea>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseGetAQuote}>
                                            Send
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    </div>
                                </div>
                                <div className="user-stats-desc">
                                    <ul className="user-stats">
                                        <li className="pl-0"><Icon className="mr-2" icon={mapMarker} /> From<strong>{Location.country}</strong></li>
                                        {/* <li className="pl-0"><Icon className="mr-2" icon={userO} /> Member since<strong>{user.date.split('T')[0]}</strong></li> */}
                                        <li className="pl-0"><Icon className="mr-2" icon={clockO} /> Avg. Response Time<strong>NAN</strong></li>
                                        <li className="pl-0"><Icon className="mr-2" icon={paperPlane} /> Recent Delivery<strong>NAN</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="seller-profile">
                        <div className="description">
                            <h3>Description</h3>
                            <p className="mt-2">{TitleAndOverview.professional_overview}
                            </p>
                        </div>
                        <div className="languages">
                            <h3>Languages</h3>
                            <ul className="mt-2">
                            {languageVal.length > 0 && languageVal.map((itemoflanguage,index) => (
                                <li>{itemoflanguage.language}&nbsp;&nbsp;- <span>{itemoflanguage.proficiency}</span></li>
                                ))}
                            </ul>
                        </div>
                        {/*<div className="linked-accounts">
                            <h3>Linked Accounts</h3>
                            <ul>
                                <li><Icon className="mr-2" icon={facebookSquare} /><span className="text">Facebook</span></li>
                                <li><Icon className="mr-2" icon={linkedinSquare} /><span className="text">LinkedIn</span></li>
                            </ul>
                        </div>*/}
                        <div className="skills">
                            <h3>Main Service You Offer</h3>
                            <p className="mt-2">{expertise.category}</p>
                        </div>
                        <div className="skills">
                            <h3>Skills</h3>
                            <ul className="mt-2">
                                <li className=""><Link to="">{expertise.skills}</Link></li>
                                {/*<li className=""><Link to="">voice acting</Link></li>
                                <li className=""><Link to="">voiceover</Link></li>
                                <li className=""><Link to="">voice over</Link></li>
                                <li className=""><Link to="">voiceover talent</Link></li>
                                <li className=""><Link to="">voice actor</Link></li>
                                <li className=""><Link to="">voicetalent</Link></li>
                                <li className=""><Link to="">voiceacting</Link></li>
                                <li className=""><Link to="">voiceactor</Link></li>
                                <li className=""><Link to="">voiceover artist</Link></li>*/}
                            </ul>
                        </div>
                        <div className="education-list list">
                            <h3>Education</h3>
                            <ul className="mt-2">
                            {education.length > 0 && education.map((itemofeducation,index) => (
                                <li>
                                    <p>{itemofeducation.degree}</p>
                                    <p>{itemofeducation.provider}, Graduated {itemofeducation.to ? itemofeducation.to.split('-')[0] : ''}</p>
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div className="education-list list">
                            <h3>Certificate</h3>
                            <ul className="mt-2">
                            {certification.length > 0 && certification.map((itemofcertification,index) => (
                                <li>
                                    <p>{itemofcertification.certification_name}</p>
                                    <p>{itemofcertification.provider}</p>
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div className="education-list list">
                            <h3>Employment</h3>
                            <ul className="mt-2">
                            {employment.length > 0 && employment.map((itemofemployment,index) => (
                                <li>
                                    <p>{itemofemployment.company_name} ( <strong>{itemofemployment.from.split('T')[0]} - {itemofemployment.to.split('T')[0]}</strong> )</p>
                                    <p>{itemofemployment.title}</p>
                                    <p>{itemofemployment.city}, {itemofemployment.country}</p>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 right">
                    {/*<h2>Cyber2Cyber's Gigs</h2>
                    <div className="recommended">
                        <div className="row">
                            <div className="col-md-4">
                                <div>
                                    <Link to="">
                                        <img className="img-fluid" src="assets/images/list/v1.png" />
                                    </Link>
                                    <div className="inner-slider">
                                        <div className="inner-wrapper">
                                            <div className="d-flex align-items-center">
                                                <span className="seller-image">
                                       <img className="img-fluid"
                                          src="assets/images/user/s1.png"
                                          alt='' />
                                       </span>
                                                <span className="seller-name">
                                       <Link to="profile">Marcin Kowalski</Link>
                                       <span className="level hint--top level-one-seller">
                                       Level 1 Seller
                                       </span>
                                                </span>
                                            </div>
                                            <h3>I will create professional audio ads or radio commercials for your project</h3>
                                            <div className="content-info">
                                                <div className="rating-wrapper">
                                                    <span className="gig-rating text-body-2">
                                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
                                                <path fill="currentColor"
                                                   d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
                                                </path>
                                             </svg>
                                             5.0
                                             <span>(7)</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="footer">
                                                <i className="fa fa-heart" aria-hidden="true"></i>
                                                <div className="price">
                                                    <Link to="">
                                          Starting At <span> $1,205</span>
                                          </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    <Link to="">
                                        <img className="img-fluid" src="assets/images/list/v2.png" />
                                    </Link>
                                    <div className="inner-slider">
                                        <div className="inner-wrapper">
                                            <div className="d-flex align-items-center">
                                                <span className="seller-image">
                                       <img className="img-fluid"
                                          src="assets/images/user/s2.png"
                                          alt='' />
                                       </span>
                                                <span className="seller-name">
                                       <Link to="profile">Marcin Kowalski</Link>
                                       <span className="level hint--top level-one-seller">
                                       Level 1 Seller
                                       </span>
                                                </span>
                                            </div>
                                            <h3>I will create professional audio ads or radio commercials for your project</h3>
                                            <div className="content-info">
                                                <div className="rating-wrapper">
                                                    <span className="gig-rating text-body-2">
                                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
                                                <path fill="currentColor"
                                                   d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
                                                </path>
                                             </svg>
                                             5.0
                                             <span>(7)</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="footer">
                                                <i className="fa fa-heart" aria-hidden="true"></i>
                                                <div className="price">
                                                    <Link to="">
                                          Starting At <span> $1,205</span>
                                          </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    <Link to="">
                                        <img className="img-fluid" src="assets/images/list/v3.png" />
                                    </Link>
                                    <div className="inner-slider">
                                        <div className="inner-wrapper">
                                            <div className="d-flex align-items-center">
                                                <span className="seller-image">
                                       <img className="img-fluid"
                                          src="assets/images/user/s3.png"
                                          alt='' />
                                       </span>
                                                <span className="seller-name">
                                       <Link to="profile">Marcin Kowalski</Link>
                                       <span className="level hint--top level-one-seller">
                                       Level 1 Seller
                                       </span>
                                                </span>
                                            </div>
                                            <h3>I will create professional audio ads or radio commercials for your project</h3>
                                            <div className="content-info">
                                                <div className="rating-wrapper">
                                                    <span className="gig-rating text-body-2">
                                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
                                                <path fill="currentColor"
                                                   d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
                                                </path>
                                             </svg>
                                             5.0
                                             <span>(7)</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="footer">
                                                <i className="fa fa-heart" aria-hidden="true"></i>
                                                <div className="price">
                                                    <Link to="">
                                          Starting At <span> $1,205</span>
                                          </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>*/}
                    <div className="review-section">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h4 className="m-0">Reviews as Seller <small><span className="star-rating-s15"></span><span><span
                           className="total-rating-out-five header-average-rating"
                           data-impression-collected="true">5</span></span><span><span
                           className="total-rating header-total-rating"
                           data-impression-collected="true">(28051)</span></span></small> </h4>
                            <select className="custom-select custom-select-sm border-0 shadow-sm ml-2">
                           <option>Most Relevant</option>
                           <option>Most Recent</option>
                        </select>
                        </div>
                        <div className="breakdown">
                            <ul className="header-stars">
                                <li>
                                    Seller communication level
                                    <small>
                              <span className="star-rating-s15"></span>
                              <span className="total-rating-out-five">5</span>
                              </small>
                                </li>
                                <li>
                                    Recommend to a friend
                                    <small>
                              <span className="star-rating-s15"></span>
                              <span className="total-rating-out-five">5</span>
                              </small>
                                </li>
                                <li>
                                    Service as described
                                    <small>
                              <span className="star-rating-s15"></span>
                              <span className="total-rating-out-five">5</span>
                              </small>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="review-list">
                        <ul>
                            <li>
                                <div className="d-flex">
                                    <div className="left">
                                        <span>
                                 <img
                                    src="assets/images/user/s9.png"
                                    className="profile-pict-img img-fluid" alt="" />
                                 </span>
                                    </div>

                                    <div className="right">
                                        <h4>
                                            Cyber2Cyber
                                            <Button onClick={handleShowReview} className="btn btn-sm btn-info ml-3 mr-3">Give a Review</Button>
                                            <span className="gig-rating text-body-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15"
                                          height="15">
                                          <path fill="currentColor"
                                             d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
                                          </path>
                                       </svg>
                                       5.0
                                    </span>
                                        </h4>
                                        <Modal show={showReview} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleCloseReview}>
                                            <Modal.Header closeButton>
                                              <Modal.Title>Review Form</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <p><span className="font-weight-bold">Select you Rating:</span> {ratingTextData}</p>
                                                            <p>
                                                                <ReactStars
                                                                    count={5}
                                                                    onChange={ratingChanged}
                                                                    size={24}
                                                                    activeColor="#ffd700"
                                                                  />
                                                            </p>
                                                            <p><span className="font-weight-bold">Enter your Feedback:</span></p>
                                                            <p>
                                                                <textarea className="p-2" name="" cols="50" rows="10" placeholder="Enter your Feedback here"></textarea>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                              <Button variant="secondary" onClick={handleClose}>
                                                Close
                                              </Button>
                                            </Modal.Footer>
                                          </Modal>
                                        <div className="country d-flex align-items-center">
                                            <span>
                                    <img className="country-flag img-fluid"
                                       src="assets/images/flag/Pakistan.png" />
                                    </span>
                                            <div className="country-name font-accent">Pakistan</div>
                                        </div>
                                        <div className="review-description">
                                            <p>
                                                The process was smooth, after providing the required info, {user.first_name} sent me an outstanding packet of wireframes. Thank you a lot!
                                            </p>
                                        </div>
                                        <span className="publish py-3 d-inline-block w-100">Published 4 weeks ago</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex">
                                    <div className="left">
                                        <span>
                                 <img
                                    src="assets/images/user/s8.png"
                                    className="profile-pict-img img-fluid" alt="" />
                                 </span>
                                    </div>
                                    <div className="right">
                                        <h4>
                                            Cyber2Cyber
                                            <span className="gig-rating text-body-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15"
                                          height="15">
                                          <path fill="currentColor"
                                             d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
                                          </path>
                                       </svg>
                                       5.0
                                    </span>
                                        </h4>
                                        <div className="country d-flex align-items-center">
                                            <span>
                                    <img className="country-flag img-fluid"
                                       src="assets/images/flag/flag.png" />
                                    </span>
                                            <div className="country-name font-accent">Germany</div>
                                        </div>
                                        <div className="review-description">
                                            <p>
                                                The process was smooth, after providing the required info, {user.first_name} sent me an outstanding packet of wireframes. Thank you a lot!
                                            </p>
                                        </div>
                                        <span className="publish py-3 d-inline-block w-100">Published 4 weeks ago</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex">
                                    <div className="left">
                                        <span>
                                 <img
                                    src="assets/images/user/s7.png"
                                    className="profile-pict-img img-fluid" alt="" />
                                 </span>
                                    </div>
                                    <div className="right">
                                        <h4>
                                            Cyber2Cyber
                                            <span className="gig-rating text-body-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15"
                                          height="15">
                                          <path fill="currentColor"
                                             d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
                                          </path>
                                       </svg>
                                       5.0
                                    </span>
                                        </h4>
                                        <div className="country d-flex align-items-center">
                                            <span>
                                    <img className="country-flag img-fluid"
                                       src="assets/images/flag/uk.png" />
                                    </span>
                                            <div className="country-name font-accent">UK</div>
                                        </div>
                                        <div className="review-description">
                                            <p>
                                                The process was smooth, after providing the required info, {user.first_name} sent me an outstanding packet of wireframes. Thank you a lot!
                                            </p>
                                        </div>
                                        <span className="publish py-3 d-inline-block w-100">Published 4 weeks ago</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex">
                                    <div className="left">
                                        <span>
                                 <img
                                    src="assets/images/user/s6.png"
                                    className="profile-pict-img img-fluid" alt="" />
                                 </span>
                                    </div>
                                    <div className="right">
                                        <h4>
                                            Cyber2Cyber
                                            <span className="gig-rating text-body-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15"
                                          height="15">
                                          <path fill="currentColor"
                                             d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
                                          </path>
                                       </svg>
                                       5.0
                                    </span>
                                        </h4>
                                        <div className="country d-flex align-items-center">
                                            <span>
                                    <img className="country-flag img-fluid"
                                       src="assets/images/flag/australia.png" />
                                    </span>
                                            <div className="country-name font-accent">Australia</div>
                                        </div>
                                        <div className="review-description">
                                            <p>
                                                The process was smooth, after providing the required info, {user.first_name} sent me an outstanding packet of wireframes. Thank you a lot!
                                            </p>
                                        </div>
                                        <span className="publish py-3 d-inline-block w-100">Published 4 weeks ago</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  freelancerProfile: state.freelancerProfile,
});

export default connect(mapStateToProps)(Profile);