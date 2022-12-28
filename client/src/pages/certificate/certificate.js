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
import {plusCircle} from 'react-icons-kit/fa/plusCircle'
import Table from 'react-bootstrap/Table';
import Alert from '../../components/alert/Alert';
import {edit} from 'react-icons-kit/fa/edit';
import {trashO} from 'react-icons-kit/fa/trashO';
import { addCertificate, deleteCertificate, updateCertificate } from "../../actions/freelancerProfile";


const Certificate = ({ freelancerProfile : { certification } , setAlert, addCertificate, deleteCertificate, updateCertificate, isAuthenticated }) => {

  const [DataOfCertificate , setDataOfCertificate] = useState([]);

  const [formData , setFormData] = useState({
    certification_name: "",
    provider: "",
    description: "",
    certification_link: "",
    _id: ""
  });

  const { certification_name, provider, description, certification_link , _id } = formData;

    const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // setDataOfCertificate(DataOfCertificate => [...DataOfCertificate, formData]);
    if (showUpdate == true) {
      updateCertificate(_id, {
        certification_name,
        provider,
        description,
        certification_link
      });
    } else {
      addCertificate({
        certification_name,
        provider,
        description,
        certification_link
      });
    }
    setFormData({});
    setShow(false);
    setShowUpdate(false);
  };

  const updateCertificateFunc = async (e) => {
    setShowUpdate(true);
    setShow(true);
    setFormData(e);
  }

  const deleteCertificateFunc = async (e) => {
    deleteCertificate(e);
  }

    useEffect(() => {
      setDataOfCertificate(certification);
  }, [certification]);

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
                              <h3 className="text-primary">Certification</h3>
                              <p className="font-weight-bold">4 of 11</p>
                              <div className="row form-group">
                                <div className="col-md-8">
                                  <h6 className="font-weight-bold mb-4 mt-4">Update your certification info</h6>
                                </div>
                                <div className="col-md-4 text-right mt-4">
                                  <Button onClick={handleShow} className="c-btn c-fill-color-btn pull-right"><Icon icon={plusCircle} /> Add Certificate</Button>
                                </div>
                              </div>
                              <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Certificate Name</th>
                                    <th>Provider</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                              {DataOfCertificate.length > 0 && DataOfCertificate.map((itemofCertificate,index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{itemofCertificate.certification_name}</td>
                                    <td>{itemofCertificate.provider}</td>
                                    <td>{itemofCertificate.description}</td>
                                    <td><button onClick={() => updateCertificateFunc(itemofCertificate)} className="btn btn-info btn-sm"><Icon icon={edit} /></button> <button onClick={() => deleteCertificateFunc(itemofCertificate._id)} className="btn btn-danger btn-sm"><Icon icon={trashO} /></button></td>
                                  </tr>
                                ))}
                               </tbody>
                              </Table>
                               <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Add Certificate</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                  <form onSubmit={(e) => onSubmit(e)}>
                                    <div className="row d-flex align-items-center form-group">
                                        <div className="col-md-12 col-12">
                                            <p className="text-muted font-weight-bold mb-2">Certification Name/Title</p>
                                        </div>
                                        <div className="col-md-8 col-12">
                                          <input type="text" 
                                          className="form-control" 
                                          placeholder="Ex: AWS Certified Developer"
                                          name="certification_name"
                                          value={certification_name}
                                          onChange={(e) => onChange(e)}
                                           />
                                        </div>
                                        <div className="col-md-12 col-12 mt-3">
                                          <p className="font-weight-bold">Provider</p>
                                        </div>
                                        <div className="col-md-8 col-12">
                                          <input type="text" className="form-control" placeholder="Ex: AWS"
                                          name="provider"
                                          value={provider}
                                          onChange={(e) => onChange(e)}
                                           />
                                        </div>
                                        <div className="col-md-12 col-12 mt-3">
                                          <p className="font-weight-bold">Description</p>
                                        </div>
                                        <div className="col-md-8 col-12">
                                          <textarea className="form-control" rows="6"
                                          name="description"
                                          value={description}
                                          onChange={(e) => onChange(e)}
                                          ></textarea>
                                        </div>
                                        <div className="col-md-12 col-12 mt-3">
                                          <p className="font-weight-bold">Certification Verification Link</p>
                                        </div>
                                        <div className="col-md-8 col-12">
                                          <input type="text" className="form-control" placeholder="Ex: https://www.abc.com"
                                          name="certification_link"
                                          value={certification_link}
                                          onChange={(e) => onChange(e)}
                                           />
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
                                <Link to="/employment" className="btn btn-normal">Skip this step</Link>
                                </div>
                                <div className="col text-right">
                                <Link to="/education" className="btn btn-default mr-1">Back</Link>
                                  <Link to="/employment" className="btn btn-primary">Next: Employment</Link>
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

Certificate.propTypes = {
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  freelancerProfile: state.freelancerProfile,
});


export default connect(mapStateToProp, {setAlert, addCertificate, deleteCertificate, updateCertificate})(Certificate);