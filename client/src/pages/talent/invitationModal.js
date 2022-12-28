import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect, useDispatch } from 'react-redux';
import { postJobGet } from '../../actions/postJob';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { proposalAdd, proposalCheckbyId } from '../../actions/proposalAndContract';

const InvitationModal = ({ show, freelancer, handleClose, proposalAndContract: { ProposalCheckItemData }, postJob: { postJobData }, auth: { isAuthenticated, user } }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [selectedJob, setSelectedJob] = useState(null)

    const [formData, setFormData] = useState({
        client_comment: null
    });

    const { client_comment } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        dispatch(postJobGet())
    }, [])

    useEffect(() => {
        if (selectedJob) {
            dispatch(proposalCheckbyId(selectedJob._id, { freelancer_id: freelancer._id, hire_manager_id: selectedJob.hire_manager_id }))
        }
    }, [selectedJob])

    const onSubmit = async (e) => {
        e.preventDefault();
        var job_id = selectedJob._id;
        var freelancer_id = freelancer._id;
        var hire_manager_id = selectedJob.hire_manager_id;
        var payment_type_id = selectedJob.payment_type_id;
        var payment_amount = selectedJob.payment_amount;
        var current_proposal_status = "6173d8be9b109e2dd8457268";
        var client_grade = user.type;
        var freelancer_comment = "";
        var freelancer_grade = "";
        var user_name = user.user_name;
        dispatch(proposalAdd({
            job_id,
            freelancer_id,
            hire_manager_id,
            payment_type_id,
            payment_amount,
            current_proposal_status,
            client_grade,
            freelancer_comment,
            user_name,
            freelancer_grade,
            client_comment
        }, () => history.push('/')))
        setFormData({});
    };


    return (
        <Modal show={show} size="md" className={'modal-invitation'} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{!selectedJob ? "Select Job for Invitation" : "Intive for a job"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    {selectedJob ? <>
                        <div className="row">
                            <div className="col-md-12">
                                <p className="text-primary text-justify overflow-hidden">{selectedJob.description}</p>
                                {
                                    ProposalCheckItemData.proposalSubmitted == true
                                        ?
                                        <p className="text-danger font-weight-bold">Proposal has already been submitted...!</p>
                                        :
                                        (
                                            <>
                                                <textarea className="form-control mb-5"
                                                    name="client_comment"
                                                    value={client_comment}
                                                    onChange={(e) => onChange(e)}
                                                    rows="10" placeholder="Add cover letter" disabled={ProposalCheckItemData.proposalSubmitted}></textarea>
                                            </>
                                        )
                                }
                            </div>
                        </div>
                    </> : (
                        postJobData.length == 0 ?
                            <div className="mt-5 border border-primary p-5">
                                <h6 className="text-primary text-center mb-0">You have no jobs</h6>
                            </div>
                            : (
                                postJobData.map((jobDetailData, index) => (
                                    <div className="card my-2 p-3" onClick={() => setSelectedJob(jobDetailData)}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h4>Description</h4>
                                                <p className="text-muted text-justify overflow-hidden">{jobDetailData.description}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6>Budget Type</h6>
                                                <p className="text-muted">{jobDetailData.payment_type_id == "61d045790971f502007f5a9c" ? "Fixed" : "Hourly"}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <h6>Budget Amount</h6>
                                                <p className="text-muted">{jobDetailData.payment_amount}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="default" onClick={() => {
                    handleClose()
                    setSelectedJob(null)
                }}>
                    Cancel
                </Button>
                {postJobData?.length > 0 && <Button onClick={(e) => onSubmit(e)} disabled={!client_comment} variant="primary" >
                    Invite
                </Button>}
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProp = (state) => ({
    auth: state.auth,
    postJob: state.postJob,
    proposalAndContract: state.proposalAndContract
});

export default connect(mapStateToProp)(InvitationModal);