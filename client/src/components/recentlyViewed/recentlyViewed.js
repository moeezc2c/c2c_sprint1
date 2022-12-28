import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

import "slick-carousel/slick/slick.css";

import Slider from "react-slick";

const RecentlyViewed = () => {

	var settings = {
	    slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        responsive: [{
                breakpoint: 1099,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }

        ]
	  };

  return (
    <React.Fragment>
   		<section className="py-5">
        <div className="view_slider recommended">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h3>Recently Viewed & More</h3>
                        <Slider className="view recent-slider recommended-slider" {...settings}>
                          <div>
							    <Link to="/product-detail">
							        <img className="img-fluid" src="assets/images/list/v1.png" />
							    </Link>
							    <div className="inner-slider">
							        <div className="inner-wrapper">
							            <div className="d-flex align-items-center">
							                <span className="seller-image">
							                    <img className="img-fluid" src="assets/images/user/s1.png" alt='' />
							                </span>
							                <span className="seller-name">
							                    <Link to="/profile">Marcin Kowalski</Link>
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
							                            <path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
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
							                    <Link to="/#">
							                        Starting At <span> $1,205</span>
							                    </Link>
							                </div>
							            </div>
							        </div>
							    </div>
							</div>
							<div>
							    <Link to="/product-detail">
							        <img className="img-fluid" src="assets/images/list/v2.png" />
							    </Link>
							    <div className="inner-slider">
							        <div className="inner-wrapper">
							            <div className="d-flex align-items-center">
							                <span className="seller-image">
							                    <img className="img-fluid" src="assets/images/user/s2.png" alt='' />
							                </span>
							                <span className="seller-name">
							                    <Link to="/profile">Marcin Kowalski</Link>
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
							                            <path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
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
							                    <Link to="/#">
							                        Starting At <span> $1,205</span>
							                    </Link>
							                </div>
							            </div>
							        </div>
							    </div>
							</div>
							<div>
							    <Link to="/product-detail">
							        <img className="img-fluid" src="assets/images/list/v3.png" />
							    </Link>
							    <div className="inner-slider">
							        <div className="inner-wrapper">
							            <div className="d-flex align-items-center">
							                <span className="seller-image">
							                    <img className="img-fluid" src="assets/images/user/s3.png" alt='' />
							                </span>
							                <span className="seller-name">
							                    <Link to="/profile">Marcin Kowalski</Link>
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
							                            <path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
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
							                    <Link to="/#">
							                        Starting At <span> $1,205</span>
							                    </Link>
							                </div>
							            </div>
							        </div>
							    </div>
							</div>
							<div>
							    <Link to="/product-detail">
							        <img className="img-fluid" src="assets/images/list/v4.png" />
							    </Link>
							    <div className="inner-slider">
							        <div className="inner-wrapper">
							            <div className="d-flex align-items-center">
							                <span className="seller-image">
							                    <img className="img-fluid" src="assets/images/user/s4.png" alt='' />
							                </span>
							                <span className="seller-name">
							                    <Link to="/profile">Marcin Kowalski</Link>
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
							                            <path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
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
							                    <Link to="/#">
							                        Starting At <span> $1,205</span>
							                    </Link>
							                </div>
							            </div>
							        </div>
							    </div>
							</div>
							<div>
							    <Link to="/product-detail">
							        <img className="img-fluid" src="assets/images/list/v5.png" />
							    </Link>
							    <div className="inner-slider">
							        <div className="inner-wrapper">
							            <div className="d-flex align-items-center">
							                <span className="seller-image">
							                    <img className="img-fluid" src="assets/images/user/s5.png" alt='' />
							                </span>
							                <span className="seller-name">
							                    <Link to="/profile">Marcin Kowalski</Link>
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
							                            <path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
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
							                    <Link to="/#">
							                        Starting At <span> $1,205</span>
							                    </Link>
							                </div>
							            </div>
							        </div>
							    </div>
							</div>
							<div>
							    <Link to="/product-detail">
							        <img className="img-fluid" src="assets/images/list/v6.png" />
							    </Link>
							    <div className="inner-slider">
							        <div className="inner-wrapper">
							            <div className="d-flex align-items-center">
							                <span className="seller-image">
							                    <img className="img-fluid" src="assets/images/user/s6.png" alt='' />
							                </span>
							                <span className="seller-name">
							                    <Link to="/profile">Marcin Kowalski</Link>
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
							                            <path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
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
							                    <Link to="/#">
							                        Starting At <span> $1,205</span>
							                    </Link>
							                </div>
							            </div>
							        </div>
							    </div>
							</div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </React.Fragment>
  );
};


export default connect()(RecentlyViewed);