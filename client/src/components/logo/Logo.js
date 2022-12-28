import React from "react";
import { Link } from "react-router-dom";
import {SVGLogo,SVGLogo2} from "../SVG";

export const Logo = (props) => {
  return (
    <React.Fragment>
      <Link className="navbar-brand" to="/">
        {/* <img src="assets/images/logo.svg" alt="" /> */}
        {props.type ? <>
          {props.type == 1 && <SVGLogo />}
          {props.type == 2 && <SVGLogo2 />}
          </>
          :
          <SVGLogo />
        }
      </Link>
    {/* <form className="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
              <input type="text" className="form-control bg-white small" placeholder="Find Services..." aria-label="Search" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
              <i className="fa fa-search fa-sm"></i>
              </button>
              </div>
          </div>
        </form>*/}
     </React.Fragment>
  );
};

export default Logo;
