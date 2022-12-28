import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Icon } from 'react-icons-kit';
import {institution} from 'react-icons-kit/fa/institution';
import Alert from '../../components/alert/Alert';
import {edit} from 'react-icons-kit/fa/edit';
import {trashO} from 'react-icons-kit/fa/trashO';
import { addEmployment, updateEmployment, deleteEmployment} from "../../actions/freelancerProfile";

const Employment = ({ freelancerProfile : { employment } , setAlert, addEmployment, updateEmployment, deleteEmployment, isAuthenticated}) => {

  const [DataOfEmployment , setDataOfEmployment] = useState([]);
   var [current, setcurrent] = useState(false)

  const [formData , setFormData] = useState({
    company_name: "",
    city: "",
    country: "",
    title: "",
    from: "",
    to: "",
    description: "",
    _id : ""
  });

  const { company_name, city, country, title, from, to, description, _id } = formData;

    const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {

    e.preventDefault();
    if (showUpdate == true) {
      updateEmployment(_id, {
        company_name,
        city,
        country,
        title,
        from,
        to,
        current,
        description
      });
    } else {
      addEmployment({
        company_name,
        city,
        country,
        title,
        from,
        to,
        current,
        description
      });
    }
    // setDataOfEmployment(DataOfEmployment => [...DataOfEmployment, formData]);
    setFormData({});
    setShow(false);
    setShowUpdate(false);
  };

  const updateEmploymentFunc = async (e) => {
    setShowUpdate(true);
    setShow(true);
    setFormData(e);
    setcurrent(e.current);
  }

  const deleteEmploymentFunc = async (e) => {
    deleteEmployment(e);
  }

   useEffect(() => {
     setDataOfEmployment(employment)
  }, [employment]);

   const [show, setShow] = useState(false);
   const [showUpdate, setShowUpdate] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => {
      setShowUpdate(false);
      setShow(true);
      setFormData({});
      setcurrent(false);
   }

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
                              <Alert />
                              <h3 className="text-primary">Employment</h3>
                              <p className="font-weight-bold">5 of 11</p>

                              <div className="row">
                                <div className="col-md-8">
                                  <h6 className="font-weight-bold mb-4 mt-4">Add your past work experience</h6>
                                  <p>Strengthen your credibility by listing your previous experiences.</p>
                                </div>
                                <div className="col-md-4 text-right mt-4">
                                  <Button onClick={handleShow} className="c-btn c-fill-color-btn pull-right"><Icon icon={institution} /> Add Employment</Button>
                                </div>
                              </div>

                              <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Company Name</th>
                                    <th>Location</th>
                                    <th>Designation</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {DataOfEmployment.length > 0 && DataOfEmployment.map((itemofEmployment,index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{itemofEmployment.company_name}</td>
                                    <td>{itemofEmployment.country}</td>
                                    <td>{itemofEmployment.title}</td>
                                    <td><button onClick={() => updateEmploymentFunc(itemofEmployment)} className="btn btn-info btn-sm"><Icon icon={edit} /></button> <button onClick={() => deleteEmploymentFunc(itemofEmployment._id)} className="btn btn-danger btn-sm"><Icon icon={trashO} /></button></td>
                                  </tr>
                                ))}
                               </tbody>
                              </Table>

                              <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Add Employment</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <form onSubmit={(e) => onSubmit(e)}>
                                    <div className="row d-flex align-items-center form-group">
                                        <div className="col-md-12 col-12">
                                            <p className="text-muted font-weight-bold mb-2">Company</p>
                                        </div>
                                        <div className="col-md-8 col-12">
                                            <input type="text" className="form-control"
                                            name="company_name"
                                            value={company_name}
                                            onChange={(e) => onChange(e)}
                                           />
                                        </div>
                                        <div className="col-md-12 col-12 mt-2">
                                            <p className="text-muted font-weight-bold mb-2">Location</p>
                                        </div>
                                        <div className="col-md-6 col-12">
                                          <input type="text" className="form-control" placeholder="City"
                                          name="city"
                                          value={city}
                                          onChange={(e) => onChange(e)}
                                           />
                                        </div>
                                        <div className="col-md-6 col-12">
                                          <select className="form-control"
                                          name="country"
                                          value={country}
                                          onChange={(e) => onChange(e)}
                                          >
                                          <option>Select</option>
                                          <option value="Afghanistan">Afghanistan</option>
                                          <option value="Åland Islands">Åland Islands</option>
                                          <option value="Albania">Albania</option>
                                          <option value="Algeria">Algeria</option>
                                          <option value="American Samoa">American Samoa</option>
                                          <option value="Andorra">Andorra</option>
                                          <option value="Angola">Angola</option>
                                          <option value="Anguilla">Anguilla</option>
                                          <option value="Antarctica">Antarctica</option>
                                          <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                          <option value="Argentina">Argentina</option>
                                          <option value="Armenia">Armenia</option>
                                          <option value="Aruba">Aruba</option>
                                          <option value="Australia">Australia</option>
                                          <option value="Austria">Austria</option>
                                          <option value="Azerbaijan">Azerbaijan</option>
                                          <option value="Bahamas">Bahamas</option>
                                          <option value="Bahrain">Bahrain</option>
                                          <option value="Bangladesh">Bangladesh</option>
                                          <option value="Barbados">Barbados</option>
                                          <option value="Belarus">Belarus</option>
                                          <option value="Belgium">Belgium</option>
                                          <option value="Belize">Belize</option>
                                          <option value="Benin">Benin</option>
                                          <option value="Bermuda">Bermuda</option>
                                          <option value="Bhutan">Bhutan</option>
                                          <option value="Bolivia">Bolivia</option>
                                          <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                          <option value="Botswana">Botswana</option>
                                          <option value="Bouvet Island">Bouvet Island</option>
                                          <option value="Brazil">Brazil</option>
                                          <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                          <option value="Brunei Darussalam">Brunei Darussalam</option>
                                          <option value="Bulgaria">Bulgaria</option>
                                          <option value="Burkina Faso">Burkina Faso</option>
                                          <option value="Burundi">Burundi</option>
                                          <option value="Cambodia">Cambodia</option>
                                          <option value="Cameroon">Cameroon</option>
                                          <option value="Canada">Canada</option>
                                          <option value="Cape Verde">Cape Verde</option>
                                          <option value="Cayman Islands">Cayman Islands</option>
                                          <option value="Central African Republic">Central African Republic</option>
                                          <option value="Chad">Chad</option>
                                          <option value="Chile">Chile</option>
                                          <option value="China">China</option>
                                          <option value="Christmas Island">Christmas Island</option>
                                          <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                          <option value="Colombia">Colombia</option>
                                          <option value="Comoros">Comoros</option>
                                          <option value="Congo">Congo</option>
                                          <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                          <option value="Cook Islands">Cook Islands</option>
                                          <option value="Costa Rica">Costa Rica</option>
                                          <option value="Cote D'ivoire">Cote D'ivoire</option>
                                          <option value="Croatia">Croatia</option>
                                          <option value="Cuba">Cuba</option>
                                          <option value="Cyprus">Cyprus</option>
                                          <option value="Czech Republic">Czech Republic</option>
                                          <option value="Denmark">Denmark</option>
                                          <option value="Djibouti">Djibouti</option>
                                          <option value="Dominica">Dominica</option>
                                          <option value="Dominican Republic">Dominican Republic</option>
                                          <option value="Ecuador">Ecuador</option>
                                          <option value="Egypt">Egypt</option>
                                          <option value="El Salvador">El Salvador</option>
                                          <option value="Equatorial Guinea">Equatorial Guinea</option>
                                          <option value="Eritrea">Eritrea</option>
                                          <option value="Estonia">Estonia</option>
                                          <option value="Ethiopia">Ethiopia</option>
                                          <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                          <option value="Faroe Islands">Faroe Islands</option>
                                          <option value="Fiji">Fiji</option>
                                          <option value="Finland">Finland</option>
                                          <option value="France">France</option>
                                          <option value="French Guiana">French Guiana</option>
                                          <option value="French Polynesia">French Polynesia</option>
                                          <option value="French Southern Territories">French Southern Territories</option>
                                          <option value="Gabon">Gabon</option>
                                          <option value="Gambia">Gambia</option>
                                          <option value="Georgia">Georgia</option>
                                          <option value="Germany">Germany</option>
                                          <option value="Ghana">Ghana</option>
                                          <option value="Gibraltar">Gibraltar</option>
                                          <option value="Greece">Greece</option>
                                          <option value="Greenland">Greenland</option>
                                          <option value="Grenada">Grenada</option>
                                          <option value="Guadeloupe">Guadeloupe</option>
                                          <option value="Guam">Guam</option>
                                          <option value="Guatemala">Guatemala</option>
                                          <option value="Guernsey">Guernsey</option>
                                          <option value="Guinea">Guinea</option>
                                          <option value="Guinea-bissau">Guinea-bissau</option>
                                          <option value="Guyana">Guyana</option>
                                          <option value="Haiti">Haiti</option>
                                          <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                          <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                          <option value="Honduras">Honduras</option>
                                          <option value="Hong Kong">Hong Kong</option>
                                          <option value="Hungary">Hungary</option>
                                          <option value="Iceland">Iceland</option>
                                          <option value="India">India</option>
                                          <option value="Indonesia">Indonesia</option>
                                          <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                          <option value="Iraq">Iraq</option>
                                          <option value="Ireland">Ireland</option>
                                          <option value="Isle of Man">Isle of Man</option>
                                          <option value="Italy">Italy</option>
                                          <option value="Jamaica">Jamaica</option>
                                          <option value="Japan">Japan</option>
                                          <option value="Jersey">Jersey</option>
                                          <option value="Jordan">Jordan</option>
                                          <option value="Kazakhstan">Kazakhstan</option>
                                          <option value="Kenya">Kenya</option>
                                          <option value="Kiribati">Kiribati</option>
                                          <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                          <option value="Korea, Republic of">Korea, Republic of</option>
                                          <option value="Kuwait">Kuwait</option>
                                          <option value="Kyrgyzstan">Kyrgyzstan</option>
                                          <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                          <option value="Latvia">Latvia</option>
                                          <option value="Lebanon">Lebanon</option>
                                          <option value="Lesotho">Lesotho</option>
                                          <option value="Liberia">Liberia</option>
                                          <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                          <option value="Liechtenstein">Liechtenstein</option>
                                          <option value="Lithuania">Lithuania</option>
                                          <option value="Luxembourg">Luxembourg</option>
                                          <option value="Macao">Macao</option>
                                          <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                                          <option value="Madagascar">Madagascar</option>
                                          <option value="Malawi">Malawi</option>
                                          <option value="Malaysia">Malaysia</option>
                                          <option value="Maldives">Maldives</option>
                                          <option value="Mali">Mali</option>
                                          <option value="Malta">Malta</option>
                                          <option value="Marshall Islands">Marshall Islands</option>
                                          <option value="Martinique">Martinique</option>
                                          <option value="Mauritania">Mauritania</option>
                                          <option value="Mauritius">Mauritius</option>
                                          <option value="Mayotte">Mayotte</option>
                                          <option value="Mexico">Mexico</option>
                                          <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                          <option value="Moldova, Republic of">Moldova, Republic of</option>
                                          <option value="Monaco">Monaco</option>
                                          <option value="Mongolia">Mongolia</option>
                                          <option value="Montenegro">Montenegro</option>
                                          <option value="Montserrat">Montserrat</option>
                                          <option value="Morocco">Morocco</option>
                                          <option value="Mozambique">Mozambique</option>
                                          <option value="Myanmar">Myanmar</option>
                                          <option value="Namibia">Namibia</option>
                                          <option value="Nauru">Nauru</option>
                                          <option value="Nepal">Nepal</option>
                                          <option value="Netherlands">Netherlands</option>
                                          <option value="Netherlands Antilles">Netherlands Antilles</option>
                                          <option value="New Caledonia">New Caledonia</option>
                                          <option value="New Zealand">New Zealand</option>
                                          <option value="Nicaragua">Nicaragua</option>
                                          <option value="Niger">Niger</option>
                                          <option value="Nigeria">Nigeria</option>
                                          <option value="Niue">Niue</option>
                                          <option value="Norfolk Island">Norfolk Island</option>
                                          <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                          <option value="Norway">Norway</option>
                                          <option value="Oman">Oman</option>
                                          <option value="Pakistan">Pakistan</option>
                                          <option value="Palau">Palau</option>
                                          <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                          <option value="Panama">Panama</option>
                                          <option value="Papua New Guinea">Papua New Guinea</option>
                                          <option value="Paraguay">Paraguay</option>
                                          <option value="Peru">Peru</option>
                                          <option value="Philippines">Philippines</option>
                                          <option value="Pitcairn">Pitcairn</option>
                                          <option value="Poland">Poland</option>
                                          <option value="Portugal">Portugal</option>
                                          <option value="Puerto Rico">Puerto Rico</option>
                                          <option value="Qatar">Qatar</option>
                                          <option value="Reunion">Reunion</option>
                                          <option value="Romania">Romania</option>
                                          <option value="Russian Federation">Russian Federation</option>
                                          <option value="Rwanda">Rwanda</option>
                                          <option value="Saint Helena">Saint Helena</option>
                                          <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                          <option value="Saint Lucia">Saint Lucia</option>
                                          <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                          <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                          <option value="Samoa">Samoa</option>
                                          <option value="San Marino">San Marino</option>
                                          <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                          <option value="Saudi Arabia">Saudi Arabia</option>
                                          <option value="Senegal">Senegal</option>
                                          <option value="Serbia">Serbia</option>
                                          <option value="Seychelles">Seychelles</option>
                                          <option value="Sierra Leone">Sierra Leone</option>
                                          <option value="Singapore">Singapore</option>
                                          <option value="Slovakia">Slovakia</option>
                                          <option value="Slovenia">Slovenia</option>
                                          <option value="Solomon Islands">Solomon Islands</option>
                                          <option value="Somalia">Somalia</option>
                                          <option value="South Africa">South Africa</option>
                                          <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                          <option value="Spain">Spain</option>
                                          <option value="Sri Lanka">Sri Lanka</option>
                                          <option value="Sudan">Sudan</option>
                                          <option value="Suriname">Suriname</option>
                                          <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                          <option value="Swaziland">Swaziland</option>
                                          <option value="Sweden">Sweden</option>
                                          <option value="Switzerland">Switzerland</option>
                                          <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                          <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                                          <option value="Tajikistan">Tajikistan</option>
                                          <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                          <option value="Thailand">Thailand</option>
                                          <option value="Timor-leste">Timor-leste</option>
                                          <option value="Togo">Togo</option>
                                          <option value="Tokelau">Tokelau</option>
                                          <option value="Tonga">Tonga</option>
                                          <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                          <option value="Tunisia">Tunisia</option>
                                          <option value="Turkey">Turkey</option>
                                          <option value="Turkmenistan">Turkmenistan</option>
                                          <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                          <option value="Tuvalu">Tuvalu</option>
                                          <option value="Uganda">Uganda</option>
                                          <option value="Ukraine">Ukraine</option>
                                          <option value="United Arab Emirates">United Arab Emirates</option>
                                          <option value="United Kingdom">United Kingdom</option>
                                          <option value="United States">United States</option>
                                          <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                          <option value="Uruguay">Uruguay</option>
                                          <option value="Uzbekistan">Uzbekistan</option>
                                          <option value="Vanuatu">Vanuatu</option>
                                          <option value="Venezuela">Venezuela</option>
                                          <option value="Viet Nam">Viet Nam</option>
                                          <option value="Virgin Islands, British">Virgin Islands, British</option>
                                          <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                          <option value="Wallis and Futuna">Wallis and Futuna</option>
                                          <option value="Western Sahara">Western Sahara</option>
                                          <option value="Yemen">Yemen</option>
                                          <option value="Zambia">Zambia</option>
                                          <option value="Zimbabwe">Zimbabwe</option>
                                        </select>
                                        </div>
                                        <div className="col-md-12 col-12 mt-2">
                                            <p className="text-muted font-weight-bold mb-2">title</p>
                                        </div>
                                        <div className="col-md-12 col-12">
                                            <input type="text" className="form-control"
                                             name="title"
                                              value={title}
                                              onChange={(e) => onChange(e)}
                                             />
                                        </div>
                                        <div className="col-md-12 col-12 mt-2">
                                            <p className="text-muted font-weight-bold mb-2">Period</p>
                                        </div>
                                        <div className="col-md-12 col-12">
                                          <input type="date" className="form-control"
                                          name="from"
                                          value={from}
                                          onChange={(e) => onChange(e)} />
                                           {/* <option value="">Month</option>
                                            <option value="01">Jan</option>
                                            <option value="02">Feb</option>
                                            <option value="03">Mar</option>
                                            <option value="04">Apr</option>
                                            <option value="05">May</option>
                                            <option value="06">Jun</option>
                                            <option value="07">Jul</option>
                                            <option value="08">Aug</option>
                                            <option value="09">Sep</option>
                                            <option value="10">Oct</option>
                                            <option value="11">Nov</option>
                                            <option value="12">Dec</option>
                                          </select>*/}
                                            </div>
                                           {/* <div className="col-md-6 col-12">
                                              <select className="form-control"
                                              name="PeriodYear"
                                          value={PeriodYear}
                                          onChange={(e) => onChange(e)}>
                                            <option>year</option>
                                            <option value="1940">1940</option>
                                            <option value="1941">1941</option>
                                            <option value="1942">1942</option>
                                            <option value="1943">1943</option>
                                            <option value="1944">1944</option>
                                            <option value="1945">1945</option>
                                            <option value="1946">1946</option>
                                            <option value="1947">1947</option>
                                            <option value="1948">1948</option>
                                            <option value="1949">1949</option>
                                            <option value="1950">1950</option>
                                            <option value="1951">1951</option>
                                            <option value="1952">1952</option>
                                            <option value="1953">1953</option>
                                            <option value="1954">1954</option>
                                            <option value="1955">1955</option>
                                            <option value="1956">1956</option>
                                            <option value="1957">1957</option>
                                            <option value="1958">1958</option>
                                            <option value="1959">1959</option>
                                            <option value="1960">1960</option>
                                            <option value="1961">1961</option>
                                            <option value="1962">1962</option>
                                            <option value="1963">1963</option>
                                            <option value="1964">1964</option>
                                            <option value="1965">1965</option>
                                            <option value="1966">1966</option>
                                            <option value="1967">1967</option>
                                            <option value="1968">1968</option>
                                            <option value="1969">1969</option>
                                            <option value="1970">1970</option>
                                            <option value="1971">1971</option>
                                            <option value="1972">1972</option>
                                            <option value="1973">1973</option>
                                            <option value="1974">1974</option>
                                            <option value="1975">1975</option>
                                            <option value="1976">1976</option>
                                            <option value="1977">1977</option>
                                            <option value="1978">1978</option>
                                            <option value="1979">1979</option>
                                            <option value="1980">1980</option>
                                            <option value="1981">1981</option>
                                            <option value="1982">1982</option>
                                            <option value="1983">1983</option>
                                            <option value="1984">1984</option>
                                            <option value="1985">1985</option>
                                            <option value="1986">1986</option>
                                            <option value="1987">1987</option>
                                            <option value="1988">1988</option>
                                            <option value="1989">1989</option>
                                            <option value="1990">1990</option>
                                            <option value="1991">1991</option>
                                            <option value="1992">1992</option>
                                            <option value="1993">1993</option>
                                            <option value="1994">1994</option>
                                            <option value="1995">1995</option>
                                            <option value="1996">1996</option>
                                            <option value="1997">1997</option>
                                            <option value="1998">1998</option>
                                            <option value="1999">1999</option>
                                            <option value="2000">2000</option>
                                            <option value="2001">2001</option>
                                            <option value="2002">2002</option>
                                            <option value="2003">2003</option>
                                            <option value="2004">2004</option>
                                            <option value="2005">2005</option>
                                            <option value="2006">2006</option>
                                            <option value="2007">2007</option>
                                            <option value="2008">2008</option>
                                            <option value="2009">2009</option>
                                            <option value="2010">2010</option>
                                            <option value="2011">2011</option>
                                            <option value="2012">2012</option>
                                            <option value="2013">2013</option>
                                            <option value="2014">2014</option>
                                            <option value="2015">2015</option>
                                            <option value="2016">2016</option>
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                        </select>
                                            </div>*/}
                                            <div className="col-md-12 col-12 mt-2">
                                                <p className="text-muted mb-2">through</p>
                                            </div>
                                            <div className="col-md-12 col-12">
                                              <input type="date" className="form-control"
                                              name="to"
                                          value={to}
                                          onChange={(e) => onChange(e)} />
                                           {/* <option value="">Month</option>
                                            <option value="01">Jan</option>
                                            <option value="02">Feb</option>
                                            <option value="03">Mar</option>
                                            <option value="04">Apr</option>
                                            <option value="05">May</option>
                                            <option value="06">Jun</option>
                                            <option value="07">Jul</option>
                                            <option value="08">Aug</option>
                                            <option value="09">Sep</option>
                                            <option value="10">Oct</option>
                                            <option value="11">Nov</option>
                                            <option value="12">Dec</option>
                                        </select>*/}
                                        </div>
                                       {/* <div className="col-md-6 col-12">
                                          <select className="form-control"
                                          name="throughYear"
                                        value={throughYear}
                                        onChange={(e) => onChange(e)}>
                                            <option>year</option>
                                            <option value="1940">1940</option>
                                            <option value="1941">1941</option>
                                            <option value="1942">1942</option>
                                            <option value="1943">1943</option>
                                            <option value="1944">1944</option>
                                            <option value="1945">1945</option>
                                            <option value="1946">1946</option>
                                            <option value="1947">1947</option>
                                            <option value="1948">1948</option>
                                            <option value="1949">1949</option>
                                            <option value="1950">1950</option>
                                            <option value="1951">1951</option>
                                            <option value="1952">1952</option>
                                            <option value="1953">1953</option>
                                            <option value="1954">1954</option>
                                            <option value="1955">1955</option>
                                            <option value="1956">1956</option>
                                            <option value="1957">1957</option>
                                            <option value="1958">1958</option>
                                            <option value="1959">1959</option>
                                            <option value="1960">1960</option>
                                            <option value="1961">1961</option>
                                            <option value="1962">1962</option>
                                            <option value="1963">1963</option>
                                            <option value="1964">1964</option>
                                            <option value="1965">1965</option>
                                            <option value="1966">1966</option>
                                            <option value="1967">1967</option>
                                            <option value="1968">1968</option>
                                            <option value="1969">1969</option>
                                            <option value="1970">1970</option>
                                            <option value="1971">1971</option>
                                            <option value="1972">1972</option>
                                            <option value="1973">1973</option>
                                            <option value="1974">1974</option>
                                            <option value="1975">1975</option>
                                            <option value="1976">1976</option>
                                            <option value="1977">1977</option>
                                            <option value="1978">1978</option>
                                            <option value="1979">1979</option>
                                            <option value="1980">1980</option>
                                            <option value="1981">1981</option>
                                            <option value="1982">1982</option>
                                            <option value="1983">1983</option>
                                            <option value="1984">1984</option>
                                            <option value="1985">1985</option>
                                            <option value="1986">1986</option>
                                            <option value="1987">1987</option>
                                            <option value="1988">1988</option>
                                            <option value="1989">1989</option>
                                            <option value="1990">1990</option>
                                            <option value="1991">1991</option>
                                            <option value="1992">1992</option>
                                            <option value="1993">1993</option>
                                            <option value="1994">1994</option>
                                            <option value="1995">1995</option>
                                            <option value="1996">1996</option>
                                            <option value="1997">1997</option>
                                            <option value="1998">1998</option>
                                            <option value="1999">1999</option>
                                            <option value="2000">2000</option>
                                            <option value="2001">2001</option>
                                            <option value="2002">2002</option>
                                            <option value="2003">2003</option>
                                            <option value="2004">2004</option>
                                            <option value="2005">2005</option>
                                            <option value="2006">2006</option>
                                            <option value="2007">2007</option>
                                            <option value="2008">2008</option>
                                            <option value="2009">2009</option>
                                            <option value="2010">2010</option>
                                            <option value="2011">2011</option>
                                            <option value="2012">2012</option>
                                            <option value="2013">2013</option>
                                            <option value="2014">2014</option>
                                            <option value="2015">2015</option>
                                            <option value="2016">2016</option>
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                        </select>
                                        </div>*/}
                                        <div className="col-md-12 col-12 mt-4 mb-4">
                                          <input type="checkbox" className="mr-2"
                                          name="current"
                                          checked={current}
                                          onChange={(e) => setcurrent(e.target.checked)} /> I currently work here
                                        </div>
                                        <div className="col-md-12 col-12 mt-2">
                                            <p className="text-muted mb-2">Description (Optional)</p>
                                        </div>
                                        <div className="col-md-12 col-12 mt-2">
                                            <textarea className="form-control" rows="6"
                                            name="description"
                                          value={description}
                                          onChange={(e) => onChange(e)}></textarea>
                                          {(showUpdate == true) ?
                                            <input type="hidden" className="form-control"
                                          name="_id"
                                          value={_id}
                                          onChange={(e) => onChange(e)}
                                           /> : ""
                                          }
                                        </div>
                                    </div>
                                    <p className="text-right">
                                    <button type="submit" className="c-btn c-fill-color-btn">
                                      {(showUpdate == true) ? "Update" : "Add"}
                                    </button>
                                    </p>
                                </form>

                               </Modal.Body>
                              <Modal.Footer>
                              </Modal.Footer>
                            </Modal>
 
                            <div className="row justify-content-center">
                                <div className="col">
                                  <Link to="/languages" className="btn btn-normal">Skip this step</Link>
                                </div>
                                <div className="col text-right">
                                  <Link to="/certificate" className="btn btn-default mr-1">Back</Link>
                                  <Link to="/languages" className="btn btn-primary">Next: Languages</Link>
                                </div>
                              </div>


                      </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};


Employment.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  freelancerProfile: state.freelancerProfile,
});


export default connect(mapStateToProp, { setAlert, addEmployment, updateEmployment, deleteEmployment })(Employment);