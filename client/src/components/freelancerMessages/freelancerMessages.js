import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect , NavLink } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { Icon } from 'react-icons-kit';
import {user} from 'react-icons-kit/fa/user';
import {fileTextO} from 'react-icons-kit/fa/fileTextO';
import {userPlus} from 'react-icons-kit/fa/userPlus';
import {group} from 'react-icons-kit/fa/group';
import {newspaperO} from 'react-icons-kit/fa/newspaperO';
import {hashtag} from 'react-icons-kit/fa/hashtag';
import {ellipsisV} from 'react-icons-kit/fa/ellipsisV';
import {phone} from 'react-icons-kit/fa/phone';
import {videoCamera} from 'react-icons-kit/fa/videoCamera';
import {image} from 'react-icons-kit/fa/image';
import {paperclip} from 'react-icons-kit/fa/paperclip';
import {camera} from 'react-icons-kit/fa/camera';
import {sendO} from 'react-icons-kit/fa/sendO';
import {check} from 'react-icons-kit/fa/check';
import {refresh} from 'react-icons-kit/fa/refresh'
import { postJobGet, deleteJob, complexityGetbyId, expectedDurationGetbyId, paymentTypeGetbyId, skillsGetbyId } from "../../actions/postJob";
import { proposalGetByClient, GetProposalUserName, messageAdd, messageGetbyId } from "../../actions/proposalAndContract";

const FreelancerMessages = ({ auth: { isAuthenticated, user }, proposalAndContract: { ProposalsGetByClient, clientProposalUsername , MessagesItemData }, postJob : { postJobData, deleteJobData, jobDetailData, complexityLevel, expectedDurationVal, paymentTypeVal, skills}, messageAdd, messageGetbyId }) => {

    
        const [formData , setFormData] = useState({
        message_text: "",
        proposal_id: ""
      });

    let { message_text, proposal_id } = formData;


      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const onSubmit = async (e) => {
        e.preventDefault();
        let freelancer_id = user._id;
        let proposal_catalog_status_id = "6173d8be9b109e2dd8457268";
        // messageAdd({
            freelancer_id,
            hire_manager_id,
            message_text,
            proposal_id,
            proposal_catalog_status_id
        // })
      };

    useEffect(() => {
        messageGetbyId(user._id);
      }, []);

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
                        {MessagesItemData.length == 0 ?
                           <div className="mt-5 border border-primary p-5">
                                <h6 className="text-primary text-center mb-0">You have no messages or proposals</h6>
                           </div>
                        : "" }
                        <div className="row m-0">
                        {
                            MessagesItemData.length > 0 && [...MessagesItemData].reverse().map(Item => (
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
                                               <div className="text-right text-muted pt-1 small">{Item.message_time.split('T')[1].split('.')[0]}</div>
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
                                 <button type="button" className="btn btn-danger btn-sm rounded">
                                    <Icon icon={refresh} />
                                </button>
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
                                        <span className="px-3 py-2 small bg-white shadow-sm  rounded">{Item.message_time.split('T')[0]}</span>
                                    </div>
                                    <div className="d-flex align-items-center osahan-post-header">
                                        <div className="dropdown-list-image mr-3 mb-auto"><img className="rounded-circle" src="assets/images/user/s1.png" alt="" /></div>
                                            <div className="mr-1">
                                                <div className="text-truncate h6 mb-3">{Item.username}
                                                </div>
                                                <p>{Item.message_text}</p>
                                            </div>
                                            <span className="ml-auto mb-auto">
                                                <div className="text-right text-muted pt-1 small">{Item.message_time.split('T')[1].split('.')[0]}</div>
                                             </span>
                                        </div>
                                    </div>
                                <form onSubmit={(e) => onSubmit(e)}>
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
  postJob: state.postJob,
  proposalAndContract: state.proposalAndContract
});

export default connect(mapStateToProps, { messageGetbyId, messageAdd })(FreelancerMessages);