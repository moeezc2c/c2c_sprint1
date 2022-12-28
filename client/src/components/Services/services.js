import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
// import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import {SVGArrowLeftCarousel, SVGArrowRightCarousel, SVGMalwareAttacks, SVGNetworkSecurity, SVGRiskManagement, SVGPenetrationTesting} from "../SVG";

const Services = () => {

    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <button
          {...props}
          className={
            "btn-slick prev slick-prev slick-arrow" +
            (currentSlide === 0 ? " slick-disabled" : "")
          }
          aria-hidden="true"
          aria-disabled={currentSlide === 0 ? true : false}
          type="button"><SVGArrowLeftCarousel/>
        </button>
      );

      const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <button
          {...props}
          className={
            "btn-slick next slick-next slick-arrow" +
            (currentSlide === slideCount - 1 ? " slick-disabled" : "")
          }
          aria-hidden="true"
          aria-disabled={currentSlide === slideCount - 1 ? true : false}
          type="button"><SVGArrowRightCarousel/>
        </button>
      );

  var settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        prevArrow: <SlickArrowLeft />,//<button className="btn-slick prev"><SVGArrowLeftCarousel/></button>,
        nextArrow: <SlickArrowRight />,//<button className="btn-slick next"><SVGArrowRightCarousel/></button>,
        responsive: [{
                breakpoint: 1099,
                slidesToShow: 4,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1024,
                slidesToShow: 3,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                slidesToShow: 1,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            },
            
            {
                breakpoint: 320,
                slidesToShow: 1,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }

        ]
  };

  return (
    <section className="main-services">
    <div className="services-wrapper">
        <div className="container-fluid pl-0 pt-0 pb-0">
            <Slider className="row service-slider services_box linear_gradient_blue d-flex justify-content-center" {...settings}>
                <div className="col pl-0 pr-0">
                    <div className="tech">
                        <div className="choice">
                            <span className="tech-icon"><SVGMalwareAttacks/></span>
                            {/* <img src="assets/images/malware-protection.svg" className="img-fluid" alt="Malware Attacks" /> */}
                            <h4 className="title"><span>Malware Attacks</span></h4>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero.</p>
                            <Link to="/#">More Details</Link>
                        </div>
                    </div>
                </div>
                <div className="col pl-0 pr-0">
                    <div className="tech">
                        <div className="choice">
                            {/* <img src="assets/images/network-security.svg" alt="Network Security" /> */}                            
                            <span className="tech-icon"><SVGNetworkSecurity/></span>
                            <h4 className="title"><span>Network Security</span></h4>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero.</p>
                            <Link to="/#">More Details</Link>
                        </div>
                    </div>
                </div>
                <div className="col pl-0 pr-0">
                    <div className="tech">
                        <div className="choice">
                            {/* <img src="assets/images/risk-management.svg" alt="Risk management" /> */}
                            <span className="tech-icon"><SVGRiskManagement/></span>
                            <h4 className="title"><span>Risk Management</span></h4>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero.</p>
                            <Link to="/#">More Details</Link>
                        </div>
                    </div>
                </div>
                <div className="col pl-0 pr-0">
                    <div className="tech">
                        <div className="choice">
                            {/* <img src="assets/images/penetration-testing.svg" className="img-fluid" alt="Penetration Testing" /> */}
                            <span className="tech-icon"><SVGPenetrationTesting/></span>
                            <h4 className="title"><span>Penetration Testing</span></h4>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero.</p>
                            <Link to="/#">More Details</Link>
                        </div>
                    </div>
                </div>
                <div className="col pl-0 pr-0">
                    <div className="tech">
                        <div className="choice">
                            {/* <img src="assets/images/risk-management.svg" alt="Risk management" /> */}
                            <span className="tech-icon"><SVGRiskManagement/></span>
                            <h4 className="title"><span>Risk Management</span></h4>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero.</p>
                            <Link to="/#">More Details</Link>
                        </div>
                    </div>
                </div>
                {/* <div className="col pl-0 pr-0">
                    <Link to="/#" className="tech col-md-3">
                        <div className="choice">
                            <img src="assets/images/data-security.svg" className="img-fluid" alt="Penetration Testing" />
                            <p className="title">Data Security</p>
                            <p className="subtitle">More Details</p>
                            <i className="fa fa-plus"></i>
                        </div>
                    </Link>
                </div> */}
            </Slider>
        </div>
    </div>
    </section>
  );
};


export default connect()(Services);