import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import UserProfileNavLink from '../../components/userProfileNavLink/userprofilenavlink';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Icon } from 'react-icons-kit';
import {wechat} from 'react-icons-kit/fa/wechat';
import Alert from '../../components/alert/Alert';
import {edit} from 'react-icons-kit/fa/edit';
import {trashO} from 'react-icons-kit/fa/trashO';
import { addLanguage, updateLanguage, deleteLanguage} from "../../actions/freelancerProfile";


const Language = ({ freelancerProfile : { languageVal } , setAlert, addLanguage, updateLanguage, deleteLanguage, isAuthenticated}) => {

   const [DataOfLanguage , setDataOfLanguage] = useState([]);

  const [formData , setFormData] = useState({
    language: "",
    proficiency: "",
    _id : ""
  });

  const { language, proficiency, _id } = formData;

    const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {

    e.preventDefault();
    if (showUpdate == true) {
      updateLanguage(_id, {
        language,
        proficiency
      });
    } else {
      addLanguage({
        language,
        proficiency
      });
    }
    // setDataOfLanguage(DataOfLanguage => [...DataOfLanguage, formData]);
    setFormData({});
    setShow(false);
    setShowUpdate(false);
  };

  const updateLanguageFunc = async (e) => {
    setShowUpdate(true);
    setShow(true);
    setFormData(e);
  }

  const deleteLanguageFunc = async (e) => {
    deleteLanguage(e);
  }

   useEffect(() => {
     setDataOfLanguage(languageVal)
  }, [languageVal]);

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
                              <h3 className="text-primary">Languages</h3>
                              <p className="font-weight-bold">6 of 11</p>

                              <div className="row form-group">
                                <div className="col-md-8">
                                  <h6 className="font-weight-bold mb-4 mt-4">Choose the language(s) you speak</h6>
                                </div>
                                <div className="col-md-4 text-right mt-4">
                                  <Button onClick={handleShow} className="btn btn-primary pull-right"><Icon icon={wechat} /> Add Language</Button>
                                </div>
                              </div>

                              <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Language</th>
                                    <th>Proficiency</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {DataOfLanguage.length > 0 && DataOfLanguage.map((itemofLanguage,index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{itemofLanguage.language}</td>
                                    <td>{itemofLanguage.proficiency}</td>
                                    <td><button onClick={() => updateLanguageFunc(itemofLanguage)} className="btn btn-info btn-sm"><Icon icon={edit} /></button> <button onClick={() => deleteLanguageFunc(itemofLanguage._id)} className="btn btn-danger btn-sm"><Icon icon={trashO} /></button></td>
                                  </tr>
                                ))}
                               </tbody>
                              </Table>

                               <Modal show={show} size="md" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
                               <form onSubmit={(e) => onSubmit(e)}>
                              <Modal.Header closeButton>
                                <Modal.Title>Add Language</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                
                                    <div className="row d-flex align-items-center form-group">
                                        <div className="col-md-12 col-12">
                                            <p className="text-muted font-weight-bold mb-2">Language</p>
                                        </div>
                                        <div className="col-md-8 col-12">
                                            <select className="form-control"
                                            name="language"
                                            value={language}
                                            onChange={(e) => onChange(e)}>
                                              <option value="category">Select language</option>
                                              <option value="English">English</option>
                                              <option value="Arabic">Arabic</option>
                                              <option value="Urdu">Urdu</option>
                                            </select>
                                        </div>
                                        <div className="col-md-12 col-12 mt-3">
                                            <p className="text-muted font-weight-bold mb-2">Proficiency</p>
                                        </div>
                                        <div className="col-md-8 col-12">
                                          <select className="form-control"
                                          name="proficiency"
                                            value={proficiency}
                                            onChange={(e) => onChange(e)}>
                                              <option value="category">Please select</option>
                                              <option value="Basic">Basic</option>
                                              <option value="Conversational">Conversational</option>
                                              <option value="Fluent">Fluent</option>
                                              <option value="Native or Bilingual">Native</option>
                                            </select>
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
                                <Link to="/hourlyRate" className="btn btn-normal">Skip this step</Link>
                                </div>
                                <div className="col text-right">
                                <Link to="/employment" className="btn btn-default mr-1">Back</Link>
                                  <Link to="/hourlyRate" className="btn btn-primary">Next: Hourly Rate</Link>
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

Language.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  freelancerProfile: state.freelancerProfile,
});



export default connect(mapStateToProp, { setAlert, addLanguage, updateLanguage, deleteLanguage })(Language);