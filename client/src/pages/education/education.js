import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Icon } from 'react-icons-kit';
import {graduationCap} from 'react-icons-kit/fa/graduationCap';
import Table from 'react-bootstrap/Table';
import Alert from '../../components/alert/Alert';
import {edit} from 'react-icons-kit/fa/edit';
import {trashO} from 'react-icons-kit/fa/trashO';
import { addEducation, updateEducation, deleteEducation} from "../../actions/freelancerProfile";

const Education = ({ freelancerProfile : { education } , setAlert, addEducation, updateEducation, deleteEducation, isAuthenticated}) => {

  const [DataOfEducation , setDataOfEducation] = useState([]);

  const [formData , setFormData] = useState({
    provider: "",
    from: "",
    to: "",
    current: "",
    degree: "",
    specialization: "",
    description: "",
    _id : ""
  });

  const { provider, from, to, current, degree, specialization, description, _id } = formData;

    const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (showUpdate == true) {
      updateEducation(_id, {
        provider,
        from,
        to,
        current,
        degree,
        specialization,
        description
      });
    } else {
      addEducation({
        provider,
        from,
        to,
        current,
        degree,
        specialization,
        description
      });
    }
    // setDataOfEducation(DataOfEducation => [...DataOfEducation, formData]);
    setFormData({});
    setShow(false);
    setShowUpdate(false);
  };

  const updateEducationFunc = async (e) => {
    setShowUpdate(true);
    setShow(true);
    setFormData(e);
  }

  const deleteEducationFunc = async (e) => {
    deleteEducation(e);
  }

    useEffect(() => {
      setDataOfEducation(education);
  }, [education]);

   const [show, setShow] = useState(false);
   const [showUpdate, setShowUpdate] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => {
      setShowUpdate(false);
      setShow(true);
      setFormData({});
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
                              <h3 className="text-primary">Education</h3>
                              <p className="font-weight-bold">3 of 11</p>
                              <div className="row form-group">
                                <div className="col-md-8">
                                  <h6 className="font-weight-bold mb-4 mt-4">Update your academic education profile</h6>
                                </div>
                                <div className="col-md-4 text-right mt-4">
                                  <Button onClick={handleShow} className="c-btn c-fill-color-btn pull-right"><Icon icon={graduationCap} /> Add Education</Button>
                                </div>
                              </div>
                              <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>College Name</th>
                                    <th>Degree Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                              {DataOfEducation.length > 0 && DataOfEducation.map((itemofEducation,index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{itemofEducation.provider}</td>
                                    <td>{itemofEducation.degree}</td>
                                    <td>{itemofEducation.description}</td>
                                    <td><button onClick={() => updateEducationFunc(itemofEducation)} className="btn btn-info btn-sm"><Icon icon={edit} /></button> <button onClick={() => deleteEducationFunc(itemofEducation._id)} className="btn btn-danger btn-sm"><Icon icon={trashO} /></button></td>
                                  </tr>
                                ))}
                               </tbody>
                              </Table>
                               <Modal className="modal-education" show={show} size="md" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
                               <form onSubmit={(e) => onSubmit(e)}>
                              <Modal.Header closeButton>
                                <Modal.Title>Add Education</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                  
                                    <div className="row d-flex align-items-center form-group">
                                        <div className="col-md-12 col-12">
                                            <p className="text-muted font-weight-bold mb-2">School/College/University</p>
                                        </div>
                                        <div className="col-md-12 col-12">
                                          <input type="text" 
                                          className="form-control" 
                                          placeholder="Ex: Northwestern University"
                                          name="provider"
                                          value={provider}
                                          onChange={(e) => onChange(e)}
                                           />
                                        </div>
                                        <div className="col-md-12 col-12 mt-3">
                                          <p className="font-weight-bold">Duration From - to (Optional)</p>
                                        </div>
                                        <div className="col-md-6 col-12">
                                          <select className="form-control"
                                          name="from"
                                          value={from}
                                          onChange={(e) => onChange(e)}>
                                              <option>From</option>
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
                                          </div>
                                          <div className="col-md-6 col-12">
                                            <select className="form-control mt-1"
                                            name="to"
                                          value={to}
                                          onChange={(e) => onChange(e)}>
                                              <option>To ( or expected graduation year)</option>
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
                                        </div>
                                        <div className="col-md-12 col-12 mt-3">
                                          <p className="font-weight-bold">Degree (Optional)</p>
                                        </div>
                                        <div className="col-md-12 col-12">
                                          <input type="text" className="form-control" placeholder="Ex: Bachelor's"
                                          name="degree"
                                          value={degree}
                                          onChange={(e) => onChange(e)}
                                           />
                                        </div>
                                        <div className="col-md-12 col-12 mt-3">
                                          <p className="font-weight-bold">Specialization (Optional)</p>
                                        </div>
                                        <div className="col-md-12 col-12">
                                          <input type="text" className="form-control" placeholder="Ex: Computer Science"
                                          name="specialization"
                                          value={specialization}
                                          onChange={(e) => onChange(e)}
                                           />
                                        </div>
                                        <div className="col-md-12 col-12 mt-3">
                                          <p className="font-weight-bold">Description (Optional)</p>
                                        </div>
                                        <div className="col-md-12 col-12">
                                          <textarea className="form-control" rows="6"
                                          name="description"
                                          value={description}
                                          onChange={(e) => onChange(e)}
                                          ></textarea>
                                          {(showUpdate == true) ?
                                            <input type="hidden" className="form-control"
                                          name="_id"
                                          value={_id}
                                          onChange={(e) => onChange(e)}
                                           /> : ""
                                          }
                                        </div>
                                    </div>
                                    
                                  
                              </Modal.Body>
                              <Modal.Footer>
                                  <p className="text-right m-0">
                                    <button type="submit" className="btn btn-primary">
                                       {(showUpdate == true) ? "Update" : "Add"}
                                    </button>
                                  </p>
                              </Modal.Footer>
                              </form>
                            </Modal>
                             <div className="row justify-content-center">
                                <div className="col">
                                  <Link to="/certificate" className="btn btn-normal">Skip this step</Link>
                                </div>
                                <div className="col text-right">
                                    <Link to="/expertiselevel" className="btn btn-default mr-1">Back</Link>
                                    <Link to="/certificate" className="btn btn-primary">Next: Certificate</Link>
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

Education.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  freelancerProfile: state.freelancerProfile,
});


export default connect(mapStateToProp, { setAlert, addEducation, updateEducation, deleteEducation })(Education);