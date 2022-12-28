import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {  Redirect  } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import {sendO} from 'react-icons-kit/fa/sendO';
import {refresh} from 'react-icons-kit/fa/refresh';
import { postJobGet, deleteJob, complexityGetbyId, expectedDurationGetbyId, paymentTypeGetbyId, skillsGetbyId } from "../../actions/postJob";
import { proposalGetByClient, GetProposalUserName, messageAdd, contractAdd } from "../../actions/proposalAndContract";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ClientMessages = ({ clientProfile : { hireManager } , auth: { isAuthenticated, user }, proposalAndContract: { ProposalsGetByClient, }, postJob : { postJobData, deleteJobData, jobDetailData, complexityLevel, expectedDurationVal, paymentTypeVal, skills}, postJobGet, deleteJob, complexityGetbyId, expectedDurationGetbyId, paymentTypeGetbyId, skillsGetbyId, proposalGetByClient, messageAdd, GetProposalUserName, contractAdd }) => {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
   const handleShow = () => {
      setShow(true);
      setFormContractData({});
   }

    const [formData , setFormData] = useState({
        message_text: "",
      });

    const [formDataContract , setFormContractData] = useState({
        end_time: '',
        payment_type_id: '',
        payment_amount: ''
      });

    const { message_text } = formData;

    const { end_time, payment_type_id, payment_amount } = formDataContract;

      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

        useEffect(() => {
            proposalGetByClient(user._id);
          }, []);

    const onSubmit = async (e,dataOfProposal) => {
        e.preventDefault();
        let proposal_id = dataOfProposal.proposal_id;
        let freelancer_id = dataOfProposal.freelancer_id;
        let hire_manager_id = hireManager._id;
        let proposal_catalog_status_id = "6173d8be9b109e2dd8457268";
        messageAdd({
            freelancer_id,
            hire_manager_id,
            message_text,
            proposal_id,
            proposal_catalog_status_id
        })
        setFormData({
            message_text: ""
        });        
      };

      const onSubmitContract = async (e, dataOfContract) => {
            e.preventDefault();
            let proposal_id = dataOfContract.proposal_id;
            let company_id = hireManager._id;
            let freelancer_id = dataOfContract.freelancer_id;
           contractAdd({ proposal_id,
            company_id,
            freelancer_id,
            end_time,
            payment_type_id,
            payment_amount
           })
           setShow(false);
      };

     if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    

  return (
      <div className="py-5">
        <div className="container">
            <div className="row">
                <main className="col col-xl-12 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                    <div className="box shadow-sm rounded bg-white mb-3 osahan-chat">
                        <h5 className="pl-3 pt-3 pr-3 border-bottom mb-0 pb-3">Messaging</h5>
                        {ProposalsGetByClient.length == 0 ?
                           <div className="mt-5 border border-primary p-5">
                                <h6 className="text-primary text-center mb-0">You have no messages or proposals</h6>
                           </div>
                        : "" }
                        <div className="row m-0">
                        {
                            ProposalsGetByClient.length > 0 && [...ProposalsGetByClient].reverse().map(Item => (
                                <>
                                <div className="border-right col-lg-5 col-xl-4 px-0">
                                <div className="osahan-chat-left">
                                    {/*<div className="position-relative icon-form-control p-3 border-bottom">
                                        <i className="fa fa-search position-absolute"></i>
                                        <input placeholder="Search messages" type="text" className="form-control" />
                                    </div>*/}
                                    <div className="osahan-chat-list">
                                        <div className="p-3 d-flex align-items-center border-bottom osahan-post-header overflow-hidden">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="assets/images/user/s1.png" alt="" />
                                            </div>
                                            <div className="font-weight-bold mr-1 overflow-hidden">
                                                <div className="text-truncate">{Item.username}</div>
                                                {/*<div className="small text-truncate overflow-hidden text-black-50"><Icon className="mr-2" icon={check} /> 
                                                    Pellentesque semper ex diam, at tristique ipsum varius sed. Pellentesque non metus ullamcorper
                                                </div>*/}
                                            </div>
                                            <span className="ml-auto mb-auto">
                                               <div className="text-right text-muted pt-1 small">{Item.proposal_time.split('T')[1].split('.')[0]}</div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 col-xl-8 px-0">
                                <div className="p-3 d-flex align-items-center  border-bottom osahan-post-header">
                                    {/*<div className="font-weight-bold mr-1 overflow-hidden">
                                        <div className="text-truncate">Carl Jenkins
                                        </div>
                                        <div className="small text-truncate overflow-hidden text-black-50">Askbootstap.com - Become a Product Manager with super power</div>
                                    </div>*/}
                                    <span className="ml-auto">
                                {/* <button type="button" className="btn btn-light btn-sm rounded mr-1">
                                     <Icon icon={phone} />
                                 </button>*/}
                                 {/*<button type="button" className="btn btn-light btn-sm rounded mr-1">
                                     <Icon icon={videoCamera} />
                                 </button>*/}
                                <Button onClick={handleShow} className="btn btn-primary btn-sm rounded mr-2">Start a Contract</Button>
                                 <button type="button" className="btn btn-danger btn-sm rounded">
                                    <Icon icon={refresh} />
                                </button>


                                <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Add Information For Proposal: {Item.proposal_id}</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                  <form onSubmit={(e, dataOfContract) => onSubmitContract(e, Item)}>
                                    <div className="row d-flex align-items-center form-group">
                                        <div className="col-md-6 col-12">
                                            <p className="text-muted font-weight-bold mb-2">Proposal Id:</p>
                                        </div>
                                        <div className="col-md-6 col-12">
                                          {Item.proposal_id}
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <p className="text-muted font-weight-bold mb-2">Freelancer Name:</p>
                                        </div>
                                        <div className="col-md-6 col-12">
                                          {Item.username}
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <p className="text-muted font-weight-bold mb-2">Start time</p>
                                        </div>
                                        <div className="col-md-6 col-12">
                                          It will be today date and current time
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <p className="text-muted font-weight-bold mb-2">Set End time</p>
                                        </div>
                                        <div className="col-md-6 col-12">
                                          <input type="date" 
                                          className="form-control" 
                                          name="end_time"
                                          value={end_time}
                                          onChange={(e) => onChange(e)}
                                           />
                                        </div>
                                    </div>
                                    <p className="text-right">
                                    <button type="submit" className="c-btn c-fill-color-btn">
                                       Start
                                    </button>
                                    </p>
                                  </form>
                              </Modal.Body>
                              <Modal.Footer>
                              </Modal.Footer>
                            </Modal>


                                {/* <div className="btn-group">
                                    <div className="dropdown-menu dropdown-menu-right">
                                       <button className="dropdown-item" type="button"><i className="mdi mdi-trash"></i> Delete</button>
                                       <button className="dropdown-item" type="button"><i className="mdi mdi-x-circle"></i> Turn Off</button>
                                    </div>
                                 </div>*/}
                              </span>
                                </div>
                                <div className="osahan-chat-box p-3 border-top border-bottom bg-light">
                                    <div className="text-center my-3">
                                        <span className="px-3 py-2 small bg-white shadow-sm  rounded">{Item.proposal_time.split('T')[0]}</span>
                                    </div>
                                    <div className="d-flex align-items-center osahan-post-header">
                                        <div className="dropdown-list-image mr-3 mb-auto"><img className="rounded-circle" src="assets/images/user/s1.png" alt="" /></div>
                                            <div className="mr-1">
                                                <div className="text-truncate h6 mb-3">{Item.username}
                                                </div>
                                                <p>{Item.freelancer_comment}</p>
                                            </div>
                                            <span className="ml-auto mb-auto">
                                                <div className="text-right text-muted pt-1 small">{Item.proposal_time.split('T')[1].split('.')[0]}</div>
                                             </span>
                                        </div>
                                    </div>
                                <form onSubmit={(e, dataOfProposal) => onSubmit(e, Item)}>
                                <div className="w-100 border-top border-bottom">
                                    <textarea 
                                    name="message_text"
                                  value={message_text}
                                  onChange={(e) => onChange(e)}
                                    placeholder="Write a message…" className="form-control border-0 p-3 shadow-none" rows="2"></textarea>
                                </div>
                                <div className="p-3 d-flex align-items-center">
                                    {/*<div className="overflow-hidden">
                                        <button type="button" className="btn btn-light btn-sm rounded mr-1">
                                             <Icon icon={image} />
                                         </button>
                                         <button type="button" className="btn btn-light btn-sm rounded mr-1">
                                             <Icon icon={paperclip} />
                                         </button>
                                        <button type="button" className="btn btn-light btn-sm rounded">
                                             <Icon icon={camera} />
                                         </button>
                                    </div>*/}
                                       {/* <input type="text" className="form-control"
                                      name="proposal_id"
                                      value={proposal_id}
                                      onChange={(e) => onChange(e)}
                                       />
                                       <input type="text" className="form-control"
                                      name="freelancer_id"
                                      value={freelancer_id}
                                      onChange={(e) => onChange(e)}
                                       />*/}
                                    <span className="ml-auto">
                                      <button type="submit" className="btn btn-primary btn-sm rounded">
                                       <Icon className="mr-2" icon={sendO} />Send
                                      </button>
                                    </span>
                                </div>
                                </form>
                            </div>
                                </>
                          ))
                        }
                        </div>
                    </div>
                </main>
                {/*<aside className="col col-xl-3 order-xl-2 col-lg-12 order-lg-2 col-12">
                    <div className="box mb-3 shadow-sm rounded bg-white list-sidebar">
                        <div className="box-title p-3">
                            <h6 className="m-0">Manage Proposals</h6>
                        </div>
                        <ul className="list-group list-group-flush">
                            <Link to="#">
                                <li className="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><Icon className="mr-2" icon={user} /> Connections <span className="ml-auto font-weight-bold">68</span></li>
                            </Link>
                            <Link to="#">
                                <li className="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><Icon className="mr-2" icon={fileTextO} /> Submitted <span className="ml-auto font-weight-bold">869</span></li>
                            </Link>
                            <Link to="#">
                                <li className="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><Icon className="mr-2" icon={userPlus} /> Offers <span className="ml-auto font-weight-bold">0</span></li>
                            </Link>
                            <Link to="#">
                                <li className="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><Icon className="mr-2" icon={group} /> Active <span className="ml-auto font-weight-bold">15</span></li>
                            </Link>
                            <Link to="#">
                                <li className="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><Icon className="mr-2" icon={newspaperO} /> Archived <span className="ml-auto font-weight-bold">3</span></li>
                            </Link>
                            <Link to="#">
                                <li className="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><Icon className="mr-2" icon={hashtag} /> Hashtag <span className="ml-auto font-weight-bold">8</span></li>
                            </Link>
                        </ul>
                    </div>
                    <div className="box shadow-sm mb-3 rounded bg-white ads-box text-center">
                        <div className="image-overlap-2 pt-4">
                            <img src="assets/images/l3.png" className="img-fluid rounded-circle shadow-sm" alt="Responsive image" />
                            <img src="assets/images/user/s8.png" className="img-fluid rounded-circle shadow-sm" alt="Responsive image" />
                        </div>
                        <div className="p-3 border-bottom">
                            <h6 className="text-dark">Gurdeep, grow your career by following <span className="font-weight-bold"> Askbootsrap</span></h6>
                            <p className="mb-0 text-muted">Stay up-to industry trends!</p>
                        </div>
                        <div className="p-3">
                            <button type="button" className="btn btn-default btn-sm pl-4 pr-4"> FOLLOW </button>
                        </div>
                    </div>
                </aside>*/}
            </div>
        </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  clientProfile: state.clientProfile,
  postJob: state.postJob,
  proposalAndContract: state.proposalAndContract
});

export default connect(mapStateToProps, { postJobGet, deleteJob, complexityGetbyId, expectedDurationGetbyId, paymentTypeGetbyId, skillsGetbyId, proposalGetByClient, messageAdd, GetProposalUserName, contractAdd })(ClientMessages);