import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, Redirect  } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import Alert from '../../components/alert/Alert';
import { postJobGet, postJobGetById, deleteJob, complexityGetbyId, expectedDurationGetbyId, paymentTypeGetbyId, skillsGetbyId } from "../../actions/postJob";
import { proposalAdd, proposalCheckbyId } from "../../actions/proposalAndContract";
import { getFreelancer } from "../../actions/freelancerProfile";

const ApplyForJob = ({ auth: { isAuthenticated, user },freelancerProfile:{freelancerProfile}, proposalAndContract: { ProposalCheckItemData }, postJob : {  jobDetailData,  applyforjob},  postJobGetById, proposalAdd }) => {
    const dispatch = useDispatch();
    const [formData , setFormData] = useState({
        freelancer_comment: ""
      });

     const { freelancer_comment } = formData;

      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const onSubmit = async (e) => {
        e.preventDefault();
        var job_id = jobDetailData._id;
        var freelancer_id = freelancerProfile._id;
        var hire_manager_id = jobDetailData.hire_manager_id;
        var payment_type_id = jobDetailData.payment_type_id;
        var payment_amount = jobDetailData.payment_amount;
        var current_proposal_status = "6173d8be9b109e2dd8457268";
        var client_grade = "";
        var client_comment = "";
        var freelancer_grade = user.type;
        var user_name = user.user_name;
        proposalAdd({
            job_id,
            freelancer_id,
            hire_manager_id,
            payment_type_id,
            payment_amount,
            current_proposal_status,
            client_grade,
            client_comment,
            user_name,
            freelancer_grade,
            freelancer_comment
        });
        setFormData({});
      };

    const [value, setValue] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(getFreelancer());
        postJobGetById(applyforjob.id)
    }, []);
    
    useEffect(() =>{
        dispatch(proposalCheckbyId(applyforjob.id,{freelancer_id:freelancerProfile._id,hire_manager_id: jobDetailData.hire_manager_id}))
    },[freelancerProfile,jobDetailData])

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

  return (
    <section className="main-page page-dashboard page-talent">
     <div className="container">
        <div className="panel-box">
     { jobDetailData.msg 
     ?
        <div className="mt-5 p-5">
            <h6 className="text-muted text-center mb-0">{jobDetailData.msg}</h6>
        </div>
     :
     <>
    
     <header className="panel-box--header">
         <h6 className="panel-box--title">{jobDetailData.headline}</h6>
     </header>
     <main className="panel-box--body">
     <div>
        <form onSubmit={(e) => onSubmit(e)} className="row">
            <div className="col-md-9 pt-1">
                <Alert />

                {
                    ProposalCheckItemData.proposalSubmitted == true
                    ?
                    <p className="text-danger font-weight-bold">Proposal has already been submitted...!</p>
                    :
                    ""
                }
                
                <p className="mt-2"><span className="font-weight-bold">Client's budget: ${jobDetailData.payment_amount}</span> {jobDetailData.payment_type_id == "61090602da79aa25b4318b49" ? "-- Fixed Amount Project" : "/ hr" }</p>
                <p className="mb-3 text-muted">{jobDetailData.description}</p>
            </div>
            {/*<div className="col-md-12">
                <h4>Terms</h4>            
            </div>*/}
            <div className="col-md-12">
                <div className="form-group mt-3">
                    <h4 className="mb-2">Cover letter</h4>
                    <p>Introduce yourself and explain why you’re a strong candidate for this job. Feel free to suggest any changes to the job details.</p>      
                </div>
                <textarea className="form-control mb-5"
                name="freelancer_comment"
                value={freelancer_comment}
                onChange={(e) => onChange(e)}
                 rows="10" placeholder="Add cover letter" disabled={ProposalCheckItemData.proposalSubmitted}></textarea>
                {/*<h5 className="mt-2">Attachments</h5>
                <input type="file" />
                <p className="mt-2">You may attach up to 10 files under the size of 25MB each. Include work samples or other documents to support your application. Do not attach your résumé — your Cyber2cyber profile is automatically forwarded to the client with your proposal.</p>*/}
            </div>
            <div className="col-md-12 text-right">
                
                {
                    ProposalCheckItemData.proposalSubmitted == false
                    ?
                    <>
                    <Link to="/job" className="btn btn-default">Cancel</Link> &nbsp;
                    <button type="submit" className="btn btn-primary">Submit Proposal</button>
                    </>
                    :
                    <Link to="/job" className="btn btn-default">Back</Link>
                }
            </div>
        </form>
     </div>
     </main>
     </>
     } 
     </div>
     </div>
     </section>
  );
};


const mapStateToProp = (state) => ({
    auth: state.auth,
    clientProfile: state.clientProfile,
    postJob: state.postJob,
    proposalAndContract: state.proposalAndContract,
    freelancerProfile: state.freelancerProfile
});

export default connect(mapStateToProp, { setAlert, postJobGet, postJobGetById, deleteJob, complexityGetbyId, expectedDurationGetbyId, paymentTypeGetbyId, skillsGetbyId, proposalAdd})(ApplyForJob);