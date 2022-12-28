import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink, useHistory} from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink';
import Alert from '../../components/alert/Alert';
import { addtitleAndOverview } from "../../actions/freelancerProfile";

const TitleAndOverview = ( { freelancerProfile : { TitleAndOverview } , setAlert, addtitleAndOverview, isAuthenticated}) => {

   const [formData , setFormData] = useState({
    title: "",
    professional_overview: ""
  });

  useEffect(() => {
    setFormData(TitleAndOverview);
  }, []);

  const { title, professional_overview } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    addtitleAndOverview({
      title,
      professional_overview
    });
    history.push("/profileandphoto");
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
                        <h3 className="text-primary">Title & Overview</h3>
                        <p className="font-weight-bold">8 of 11</p>
                          <form onSubmit={(e) => onSubmit(e)}>
                            <p className="mb-4 mt-4"><Link to="" className="text-primary">Learn more</Link> about writing a great profile or <Link to="" className="text-primary">browse profiles</Link> in your category.</p>
                              <div className="row d-flex align-items-center form-group">
                                  <div className="col-md-12 col-12">
                                      <p className="text-muted font-weight-bold mb-2">Title</p>
                                  </div>
                                  <div className="col-md-8 col-12">
                                      <input type="text" className="form-control" placeholder="Example: Legal"
                                      name="title"
                                      value={title}
                                      onChange={(e) => onChange(e)} />
                                  </div>
                                  <div className="col-md-12 col-12 mt-3">
                                      <p className="text-muted font-weight-bold mb-2">Professional Overview</p>
                                  </div>
                                  <div className="col-md-8 col-12">
                                      <textarea className="form-control" rows="6" placeholder="Highlight your top skills, experience, and interests. This is one of the first things clients will see on your profile"
                                      name="professional_overview"
                                      value={professional_overview}
                                      onChange={(e) => onChange(e)}></textarea>
                                  </div>
                              </div>

                              <div className="row justify-content-center">
                                <div className="col">
                                <Link to="/profileandphoto" className="btn btn-normal">Skip this step</Link>
                                </div>
                                <div className="col text-right">
                                  <Link to="/hourlyRate" className="btn btn-default mr-1">Back</Link>
                                  <button className="btn btn-primary" type="submit" >
                                            Next: Profile & photo
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

TitleAndOverview.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  freelancerProfile: state.freelancerProfile,
});


export default connect(mapStateToProp, { setAlert, addtitleAndOverview })(TitleAndOverview);