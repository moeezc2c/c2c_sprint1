import React from "react";
import { Link } from "react-router-dom";

const HomepageIntro = () => {
  return (
    <section className="py-5 homepage-search-block position-relative">
      <div className="container">
        <div className="row py-lg-5">
          <div className="col-lg-7">
            <div className="homepage-search-title">
              <h1 className="mb-3 text-shadow text-gray-900 font-weight-bold">
                Find The Perfect Freelance Services For Your Business
              </h1>
              <h5 className="mb-5 text-shadow text-gray-800 font-weight-normal">
                Millions of people use Cyber2Cyber to turn their ideas into
                reality.
              </h5>
              <div className="row">
                <div className="col-md-6">
                  <Link
                    to="/register"
                    className="btn btn-primary btn-block btn-lg btn-gradient shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>
                <div className="col-md-6">
                  <Link
                    to="/login"
                    className="btn btn-primary btn-block btn-lg btn-gradient shadow-sm"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <img className="img-fluid" src="assets/images/banner.svg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageIntro;
