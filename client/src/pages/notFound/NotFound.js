import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="col-lg-8 col-md-8 mx-auto text-center py-4">
      <h1>Sorry! Page not found.</h1>
      <p className="land">
        Unfortunately the page you are looking for has been moved or deleted.
      </p>
      <div className="mt-5">
        <Link to="/" className="btn btn-primary">
          GO TO HOME PAGE
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
