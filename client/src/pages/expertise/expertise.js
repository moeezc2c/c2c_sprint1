import React, { useState , useEffect} from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink , useHistory } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink';
import Alert from '../../components/alert/Alert';
import { addExpertise } from "../../actions/freelancerProfile";

const Expertise = ( { freelancerProfile : { expertise } , setAlert, addExpertise, isAuthenticated }) => {

  const [formData , setFormData] = useState({
    category: "",
    skills: ""
  });

  useEffect(() => {
    setFormData(expertise);
  }, []);

  const { category, skills } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    addExpertise({
      category,
      skills
    });
    history.push("/expertiselevel");
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
                              <h3 className="text-primary">Expertise</h3>
                              <p className="font-weight-bold">1 of 11</p>
                                <form onSubmit={(e) => onSubmit(e)}>
                                  <h6 className="font-weight-bold mb-4 mt-4">Tell us a little more about your area of core expertise</h6>
                                    <div className="row d-flex align-items-center form-group">
                                        <div className="col-md-12 col-12">
                                            <p className="text-muted font-weight-bold mb-2">What is the main service you offer?</p>
                                        </div>
                                        <div className="col-md-8 col-12">
                                            <select className="form-control" 
                                              name="category"
                                              value={category}
                                              required={true}
                                              onChange={(e) => onChange(e)}>
                                              <option value="Application security">Application security</option>
                                              <option value="Network and infrastructure security">Network and infrastructure security</option>
                                              <option value="Intrusion detection and penetration testing">Intrusion detection and penetration testing</option>
                                              <option value="Digital forensics and incident response">Digital forensics and incident response</option>
                                              <option value="Endpoint protection and mobile security">Endpoint protection and mobile security</option>
                                              <option value="Data governance, risk and compliance">Data governance, risk and compliance</option>
                                            </select>
                                        </div>
                                        <div className="col-md-8 col-12 pt-4">
                                          <p className="font-weight-bold">What skills do you offer clients?</p>
                                          <input type="text" className="form-control" 
                                          placeholder="Enter at least 1 skill e.g Cyber Security, Mobile Cyber Security" 
                                          name="skills"
                                          value={skills}
                                          required={true}
                                          onChange={(e) => onChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {/*<Link to="expertiselevel" className="c-btn c-fill-color-btn">Next: Expertise Level</Link>*/}
                                        <button className="btn btn-primary" type="submit" >
                                            Next: Expertise Level
                                        </button>
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

Expertise.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  freelancerProfile: state.freelancerProfile,
});


export default connect(mapStateToProp, { setAlert, addExpertise })(Expertise);