import React, { useState , useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink';
import { addLocation } from "../../actions/freelancerProfile";
import { Country, State, City }  from 'country-state-city';

const Location = ( { freelancerProfile : { Location } , setAlert, addLocation, isAuthenticated}) => {

    const [formData , setFormData] = useState({
      country: "",
      address: "",
      suite: "",
      city: "",
      province: "",
      zip: ""
    });

    const [statesOfCountry, setStatesOfCountry] = useState([]);
    const [citiesOfState, setCitiesOfState] = useState([]);

  useEffect(() => {
      setFormData(Location);
  }, []);

  const { country,
            address,
            suite,
            city,
            province,
            zip } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCountryChange = (e) => {
    const { value, name } = e.target;
    const { isocode } = e.target.selectedOptions[0].dataset;
    setFormData({ ...formData, [name]: value });
    const states = State.getStatesOfCountry(isocode);
    setStatesOfCountry(states);
  }

  const onProvinceChange = (e) => {
    const { value, name } = e.target;
    const { isocode, countrycode } = e.target.selectedOptions[0].dataset;
    setFormData({ ...formData, [name]: value });
    const cities = City.getCitiesOfState(countrycode, isocode);
    setCitiesOfState(cities);
  }
  
  const countries = Country.getAllCountries();

  let history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    addLocation({
      country,
            address,
            suite,
            city,
            province,
            zip
    });
    history.push("/phone");
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
                      <h3 className="text-primary">Location</h3>
                      <p className="font-weight-bold">10 of 11</p>
                        <form onSubmit={(e) => onSubmit(e)}>
                          <h6 className="font-weight-bold mb-4 mt-4">Verify your identity to create a trusted marketplace</h6>
                          <p>We use your street address and phone number to verify your identity, and your zip code to show relevant jobs. Only your city will be shown to clients.</p>
                            <div className="row d-flex align-items-center form-group">
                                <div className="col-md-12 col-12">
                                    <p className="text-muted font-weight-bold mb-2">Country</p>
                                </div>
                                <div className="col-md-6 col-12">
                                <select className="form-control"
                                    name="country"
                                    value={country}
                                    onChange={(e) => onCountryChange(e)}>
                                      <option>Please Select</option>
                                  {
                                    countries.map(item => <option value={item.name} data-isoCode={item.isoCode}>{item.name}</option> )
                                  }
                                    </select>
                                </div>
                                <div className="col-md-6 col-12">
                                  <input type="text" className="form-control" placeholder="Enter street address"
                                  name="address"
                                  value={address}
                                  onChange={(e) => onChange(e)} />
                                </div>
                                <div className="col-md-12 col-12 pt-4">
                                  <input type="text" className="form-control" placeholder="Apt/Suite"
                                  name="suite"
                                  value={suite}
                                  onChange={(e) => onChange(e)} />
                                </div>
                                <div className="col-md-6 col-12 pt-4">
                                  <p className="font-weight-bold">State/Province</p>
                                  <select className="form-control"
                                   name="province"
                                  value={province}
                                  onChange={(e) => onProvinceChange(e)}>
                                    <option>Please Select</option>
                                    {
                                      statesOfCountry.map(item => <option value={item.name} data-countryCode={item.countryCode} data-isoCode={item.isoCode}>{item.name}</option> )
                                    }
                                    
                                  </select>
                                </div>
                                <div className="col-md-6 col-12 pt-4">
                                  <p className="font-weight-bold">City</p>
                                  <select className="form-control"
                                   name="city"
                                  value={city}
                                  onChange={(e) => onChange(e)}>
                                    <option>Please Select</option>
                                    {
                                      citiesOfState.map(item => <option value={item.name}>{item.name}</option> )
                                    }
                                    
                                  </select>
                                </div>                                
                                <div className="col-md-6 col-12 pt-4">
                                  <p className="font-weight-bold">ZIP/Postal code</p>
                                  <input type="text" className="form-control"
                                  name="zip"
                                  value={zip}
                                  onChange={(e) => onChange(e)} />
                                </div>
                            </div>

                            

                            <div className="text-right">
                              <Link to="/profileandphoto" className="btn btn-default mr-1">Back</Link>
                                {/*<Link to="/Phone" className="c-btn c-fill-color-btn">Next: Phone</Link>*/}
                                <button className="btn btn-primary" type="submit" >
                                    Next: Phone
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

Location.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  freelancerProfile: state.freelancerProfile,
});


export default connect(mapStateToProp, { setAlert, addLocation })(Location);