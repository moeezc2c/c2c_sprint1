import React, { useState , useEffect} from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink, useHistory } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink';
import { addExpertLevel } from "../../actions/freelancerProfile";
import Alert from '../../components/alert/Alert';

const ExpertiseLevel = ({ freelancerProfile : { expertLevel } , setAlert, addExpertLevel, isAuthenticated}) => {

 const [formData , setFormData] = useState({
    expert_level: ""
  });

  useEffect(() => {
    setFormData(expertLevel);
  }, []);

  const { expert_level } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    // if (expert_level == "") {
    //   setAlert("Please Select any field", "danger", 3000);
    // } else {
       
    // }
    addExpertLevel({
        expert_level
      });
      history.push("/education");
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
                              <h3 className="text-primary">Expertise Level</h3>
                              <p className="font-weight-bold">2 of 11</p>
                              <Alert />
                                <form onSubmit={(e) => onSubmit(e)}>
                                  <h6 className="font-weight-bold mb-4 mt-4">What is your level of experience in this filed?</h6>
                                    <div className="row d-flex align-items-center form-group">
                                        <label className="col-md-3 text-center mr-5 ml-2 rounded border p-1 cursor-pointer"> 
                                          <p className="text-right"><input type="radio"
                                            name="expert_level"
                                            value="Entry Level"
                                            checked={expert_level == "Entry Level"}                               
                                            onChange={(e) => onChange(e)} /></p>
                                          <p className="font-weight-bold mb-1">Entry Level</p>
                                          <p>I am relatively new to this field</p>
                                        </label>
                                        <label className="col-md-3 text-center mr-5 rounded border p-1 cursor-pointer"> 
                                          <p className="text-right"><input type="radio"
                                          name="expert_level"
                                            value="Intermediate"
                                            checked={expert_level == "Intermediate"}
                                            onChange={(e) => onChange(e)}  /></p>
                                          <p className="font-weight-bold mb-1">Intermediate</p>
                                          <p>I have substantial experience in this field</p>
                                        </label>
                                        <label className="col-md-3 text-center rounded border p-1 cursor-pointer"> 
                                          <p className="text-right"><input type="radio"  
                                          name="expert_level"
                                            value="Expert" 
                                            checked={expert_level == "Expert"}
                                            onChange={(e) => onChange(e)}  /></p>
                                          <p className="font-weight-bold mb-1">Expert</p>
                                          <p>I have comprehensive experience in this field</p>
                                        </label>
                                    </div>
                                    <div className="text-right">
                                        <Link to="/expertise" className="btn btn-default mr-1">Back</Link>
                                        {/*<Link to="/education" className="c-btn c-fill-color-btn ">Next: Education</Link>*/}
                                        <button className="btn btn-primary" type="submit" >
                                            Next: Education
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

ExpertiseLevel.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  freelancerProfile: state.freelancerProfile,
});


export default connect(mapStateToProp, { setAlert, addExpertLevel })(ExpertiseLevel);