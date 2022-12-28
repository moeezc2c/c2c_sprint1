import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { Carousel } from 'react-responsive-carousel';
import Dropdown from 'react-bootstrap/Dropdown';
import {SVGSearchMagnifine, SVGArrowDown, SVGArrowLeftSilck, SVGArrowRightSilck} from "../SVG";
import Services from '../Services/services';
const MainSlider = () => {

  const [searchLocation, setSearchLocation] = useState('All');

  return (
    <section className="main-slider">
        <Carousel 
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                className={"control-arrow control-prev"}
                onClick={onClickHandler}
              >
                <SVGArrowLeftSilck/>
              </button>
            )
          } 
          renderArrowNext={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                className={"control-arrow control-next"}
                onClick={onClickHandler}
              >
                <SVGArrowRightSilck/>
              </button>
            )
          } 
            showArrows={false} 
            showStatus={false} 
            showThumbs={false} 
            infiniteLoop={false} 
            autoPlay={false}
            >
            <div className="mainSlider mainSlider-One">
            <div className="container">
                        <div>
                            <hgroup className="homepage-search-headings">
                                <h1 className="heading-h1">Find Verified & Trustworthy Cyber-Experts</h1>
                                <h2 className="heading-h2">To Protect Your Digital World.</h2>
                                <h3 className="heading-h3">Millions of people use cyber2cyber to turn their ideas into reality.</h3>
                            </hgroup>
                            <div className="homepage-search-form">
                                <form className="form-noborder">
                                    <div className="form-row row">
                                        <div className="col-lg-3 col-md-3 col-xs-12">
                                        <div className="search-location-dropdown">
                                            {/* <i className="icofont-location-arrow"></i> */}
                                            <Dropdown>
                                                <Dropdown.Toggle id="dropdown-basic" variant="default">
                                                    <span>{searchLocation}</span> <SVGArrowDown/>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item eventKey="1" onClick={()=>setSearchLocation('Cyber Content Writer')}>Cyber Content Writer</Dropdown.Item>
                                                    <Dropdown.Item eventKey="2" onClick={()=>setSearchLocation('Cyber Bug Hunter')}>Cyber Bug Hunter</Dropdown.Item>
                                                    <Dropdown.Item eventKey="3" onClick={()=>setSearchLocation('VAPT Engineer')}>VAPT Engineer</Dropdown.Item>
                                                    <Dropdown.Item eventKey="4" onClick={()=>setSearchLocation('Malware Analyst')}>Malware Analyst</Dropdown.Item>
                                                    <Dropdown.Item eventKey="5" onClick={()=>setSearchLocation('GRC Specialist')}>GRC Specialist</Dropdown.Item>
                                                    <Dropdown.Item eventKey="6" onClick={()=>setSearchLocation('Cybersecurity Trainer')}>Cybersecurity Trainer</Dropdown.Item>
                                                    <Dropdown.Item eventKey="7" onClick={()=>setSearchLocation('Cybersecurity Consultant')}>Cybersecurity Consultant</Dropdown.Item>
                                                    <Dropdown.Item eventKey="8" onClick={()=>setSearchLocation('Cyber Forensic Analyst')}>Cyber Forensic Analyst</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            
                                        </div></div>

                                        <div className="col-lg-7 col-md-6 col-xs-12">
                                        <div className="search-input">
                                            <SVGSearchMagnifine/>
                                            <input type="text" placeholder="Find Services..." className="form-control border-0 form-control-lg" />
                                        </div>
                                        </div>

                                        <div className="col-lg-2 col-md-3 col-xs-12">
                                        <div className="search-btn">
                                            <button type="submit" className="btn btn-block btn-primary">
                                                Search
                                            </button>
                                        </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                            <div className="popular">
                                <span className="popular-heading">Popular</span>
                                <ul>
                                    <li><a href="#">Network Security</a></li>
                                    <li><a href="#">Cyber Risk Management</a></li>
                                    <li><a href="#">Malware Protection</a></li>
                                    <li><a href="#">Data Security</a></li>
                                    <li><a href="#">Penetration Testing</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
            </div>
        </Carousel>

        <Services />
    </section>
  );
};


export default connect()(MainSlider);