import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const FindCyber = () => {
  return (
    <section className="main-find-services">
      <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-6 col-lg-6 col-sm-12 leftside">
              <article className="content">
                  <h3 className="title"><span>Find cyber security services</span></h3>
                  <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                  <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata.</p>
                  <Link to="" className="btn btn-default">Get Started</Link>
              </article>
            </div>
            <div className="col-md-4 col-offset-md-2 col-lg-4 col-sm-12 rightside">
              <figure className="figure-multi-layered">
                <div className="layered">
                  <img src="assets/images/find-cyber-security-services.png" alt={`Find cyber security services`}/>
                </div>
              </figure>
            </div>
          </div>
      </div>
    </section>
  );
};


export default connect()(FindCyber);