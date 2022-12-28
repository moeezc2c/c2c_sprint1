import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink, useHistory } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink';
import Alert from '../../components/alert/Alert';
import { addProfileAndPhoto } from "../../actions/freelancerProfile";

const ProfileAndPhoto = ({ freelancerProfile : { profileAndPhoto } , setAlert, addProfileAndPhoto, isAuthenticated}) => {

   
   const [formData , setFormData] = useState({
      photo_link: ""
     });
     
    const { photo_link } = formData;

   useEffect(() => {
      setFormData(profileAndPhoto);
     }, []);


      const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  let history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    addProfileAndPhoto({
      photo_link
    });
    history.push("/location");
  };

   if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

  return (
    <section className="main-page page-dashboard">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
             <UserProfileNavLink />
          </div>
          <div className="col-lg-9">
              <div className="bg-white rounded shadow-sm sidebar-page-right">
                     <div className="p-5 border-bottom">
                        <h3 className="text-primary">Profile & Photos</h3>
                        <p className="font-weight-bold">9 of 11</p>
                          <form onSubmit={(e) => onSubmit(e)}>
                            <p className="mb-4 mt-4">Please upload a professional portrait that clearly shows your face.</p>
                              <div className="row d-flex align-items-center form-group">
                                  <div className="col-md-12 col-12">
                                      <p className="text-muted font-weight-bold mb-2">Add Profile Photo Link</p>
                                  </div>
                                  <div className="col-md-8 col-12">
                                      {/*<input type="file" className="form-control" />*/}
                                      <input type="text" className="form-control"
                                      name="photo_link"
                                      value={photo_link}
                                      onChange={(e) => onChange(e)} />
                                  </div>
                                
                              </div>
                             

                              <div className="row justify-content-center">
                                <div className="col">
                                <Link to="/location" className="btn btn-normal">Skip this step</Link>
                                </div>
                                <div className="col text-right">
                                  <Link to="/titleandoverview" className="btn btn-default mr-1">Back</Link>
                                  <button className="btn btn-primary" type="submit" >
                                      Next: Location
                                  </button>
                                </div>
                              </div>

                          </form>
                      </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ProfileAndPhoto.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  freelancerProfile: state.freelancerProfile
});


export default connect(mapStateToProp, { setAlert, addProfileAndPhoto })(ProfileAndPhoto);