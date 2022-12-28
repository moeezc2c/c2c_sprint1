import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink , useHistory } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { Icon } from 'react-icons-kit'
import { envelopeO } from 'react-icons-kit/fa/envelopeO';
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink';
import { Country, State, City }  from 'country-state-city';
import Alert from '../../components/alert/Alert';
import { addhireManager, skillsGet } from "../../actions/clientProfile";
import Input from '../../components/input/input';
import { SVGWidgetLogo, FormIcon } from '../../components/SVG'

const ClientCompleteProfile = ({ clientProfile : { hireManager, skills } , setAlert, addhireManager, skillsGet, isAuthenticated }) => {

    const [formData , setFormData] = useState({
        company_id: "",
        overview: "",
        skills_level_id: "",
        experience_level: "",
        location: ""
      });

     useEffect(() => {
        skillsGet()
        setFormData(hireManager);
     }, []);

      const { company_id, overview, skills_level_id, experience_level, location } = formData;

      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const countries = Country.getAllCountries();

    let history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();       
         addhireManager({
          company_id,
          overview,
          skills_level_id,
          experience_level,
          location
        });
        history.push("/clientprofile");
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
              <div className="panel-box sidebar-page-right">
                    <div className="box-title border-bottom p-4">
                      <h4 className="h4 m-0">Profile</h4>
                    </div>
                    <div className="p-5 border-bottom">
                        
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="row">
                                <Input
                                  parentclass={`company_id col-lg-6 col-md-6 col-sm-12`}
                                  labelfor={`company_id`}
                                  id={`company_id`}
                                  className={''}
                                  label={`Company Name`}
                                  group={true}
                                  name={'company_id'}
                                  placeholder={`Enter Company Name`}
                                  // icon={<FormIcon icon={'user'} />}
                                  required={true}
                                  type={'text'}
                                  value={company_id}
                                  handlerOnChange={(e) => onChange(e)}
                                >
                                </Input>
                                {/* <div className="form-group mb-5">
                                    <label className="mb-1">Company Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Company Name"
                                      name="company_id"
                                      value={company_id}
                                      onChange={(e) => onChange(e)} />
                                </div> */}
                                
                                {/* <div className="form-group mb-5">
                                    <label className="mb-1">Overview</label>
                                    <textarea className="form-control" placeholder="Enter a brief description about yourself!" rows="7"
                                      name="overview"
                                      value={overview}
                                      onChange={(e) => onChange(e)}></textarea>
                                </div> */}
                                <div className="form-group cyber-form-control col-lg-6 col-md-6 col-sm-12">
                                    <label className="form-label">Which group of people you are looking for ?</label>
                                   {/* <input type="text" className="form-control" placeholder="eg. Mobile Developer, Wordpress, PHP"
                                       />*/}
                                       <div className="input-group">
                                       <select className="form-control"
                                          name="skills_level_id"
                                          value={skills_level_id}
                                          onChange={(e) => onChange(e)} >
                                          <option>Please Select</option>
                                          {
                                            skills.length > 0 && skills.map(item => <option value={item.skill_name}>{item.skill_name}</option> )
                                          }
                                        </select>
                                      </div>
                                </div>

                                <Input
                                  parentclass={`overview col-lg-12 col-md-12 col-sm-12`}
                                  labelfor={`overview`}
                                  id={`overview`}
                                  className={''}
                                  label={`Overview`}
                                  group={true}
                                  name={'overview'}
                                  placeholder={`Enter a brief description about yourself!`}
                                  // icon={<FormIcon icon={'user'} />}
                                  required={true}
                                  type={'textarea'}
                                  value={overview}
                                  handlerOnChange={(e) => onChange(e)}
                                >
                                </Input>

                                <div className="form-group cyber-form-control col-lg-6 col-md-6 col-sm-12">
                                    <label className="form-label mb-1">Which level of experience you are looking for ?</label>
                                    <ul className="options-list">
                                        <li>
                                        <div class="form-check">
                                        <label class="form-check-label">
                                          <input type="radio"
                                         name="experience_level"
                                         value="Entry Level"
                                         checked={experience_level == "Entry Level"}
                                         onChange={(e) => onChange(e)}
                                         className="mr-2" />
                                          
                                          Entry level
                                          </label>
                                        </div>
                                           </li>
                                        <li>
                                        <div class="form-check">
                                        <label class="form-check-label">
                                        <input type="radio"
                                            name="experience_level"
                                            value="Intermediate"
                                            checked={experience_level == "Intermediate"}
                                            onChange={(e) => onChange(e)}
                                            className="mr-2" />                                          
                                          Intermediate
                                          </label>
                                        </div> </li>
                                        <li><div class="form-check">
                                        <label class="form-check-label">
                                        <input type="radio" 
                                        name="experience_level"
                                            value="Expert"
                                            checked={experience_level == "Expert"}
                                            onChange={(e) => onChange(e)}
                                        className="mr-2" />                                          
                                          Expert
                                          </label>
                                        </div> </li>
                                    </ul>
                                </div>

                                <div className="form-group cyber-form-control col-lg-6 col-md-6 col-sm-12">
                                    <label className="form-label mb-1">Select Your Location</label>
                                    <div className="input-group">
                                    <select className="form-control"
                                    name="location"
                                      value={location}
                                      onChange={(e) => onChange(e)}>
                                      <option>Please Select</option>
                                  {
                                    countries.map(item => <option value={item.name} data-isoCode={item.isoCode}>{item.name}</option> )
                                  }
                                    </select>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                {/*<Link to="/expertise" className="c-btn c-fill-color-btn text-uppercase"> Submit your Profile </Link>*/}
                                <button className="btn btn-primary btn-sm" type="submit" >
                                    Submit your profile
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

ClientCompleteProfile.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
   auth: state.auth,
  clientProfile: state.clientProfile,
});

export default connect(mapStateToProp, { setAlert, addhireManager, skillsGet })(ClientCompleteProfile);