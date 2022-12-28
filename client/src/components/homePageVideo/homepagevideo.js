import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const HomePageVideo = () => {
  return (
    <section className="main-introduction">
       <div className="container_">
                <section className="video-widget">
                <Link to="/#">
                    <div className="video-modal">
                        <div className="picture-wrapper">
                        {/* <img src="assets/images/intro-video.png" /> */}
                        <div className="ratio ratio-16x9">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/5MMoxyK1Y9o" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        </div>
                    </div></Link>
                    <article className="content-area">
                        <div className="content-area--body">
                            <h3 className="title"><span>Introduction</span></h3>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores</p>                            
                            {/* <img alt="Company logo" src="assets/images/haerfest-logo.png" loading="lazy" /> */}
                        </div>
                        <div className="content-area--footer">
                            <span className="author">Dr. Khurram and Aman, Co-founders</span>
                            <Link to="/#" className="read-more btn btn-primary">Read More</Link>
                        </div>                        
                    </article>
                </section>
            </div>
    </section>
  );
};


export default connect()(HomePageVideo);