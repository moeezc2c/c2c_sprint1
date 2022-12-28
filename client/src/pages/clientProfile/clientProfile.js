import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
//import { Link } from "react-router-dom";
import { Link, useHistory  } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { mapMarker } from 'react-icons-kit/fa/mapMarker';
import { userO } from 'react-icons-kit/fa/userO';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { trash } from 'react-icons-kit/fa/trash'
import { postJobGet, deleteJob, complexityGetbyId, expectedDurationGetbyId, paymentTypeGetbyId, skillsGetbyId } from "../../actions/postJob";
import { setAlert } from "../../actions/alert";
import Alert from '../../components/alert/Alert';
import { fileImageO } from 'react-icons-kit/fa/fileImageO';
import { fileExcelO } from 'react-icons-kit/fa/fileExcelO';
import { filePdfO } from 'react-icons-kit/fa/filePdfO';
import { fileWordO } from 'react-icons-kit/fa/fileWordO';
import { filePowerpointO } from 'react-icons-kit/fa/filePowerpointO';
import { ic_folder } from 'react-icons-kit/md/ic_folder';
import { fileDownload } from '../../actions/file-crud';
import {SVGLocation} from '../../components/SVG';

const ClientProfile = ({ clientProfile: { hireManager }, auth: { isAuthenticated, user }, postJob: { postJobData, deleteJobData, jobDetailData, complexityLevel, expectedDurationVal, paymentTypeVal, skills }, setAlert, postJobGet, deleteJob, complexityGetbyId, expectedDurationGetbyId, paymentTypeGetbyId, skillsGetbyId }) => {
    
    if (hireManager.company_id == "")
    {
        hireManager = JSON.parse(localStorage.getItem('hireManager'));
    }
    else{
        localStorage.setItem('hireManager', JSON.stringify(hireManager));
    }

    const [showDelete, setShowDelete] = useState(false);

    const [showJobDetail, setShowJobDetail] = useState(false);

    const handleCloseDelete = () => setShowDelete(false);

    const handleCloseJobDetail = () => setShowJobDetail(false);

    useEffect(() => {
        postJobGet()
    }, []);

    const MAX_LENGTH = 250;

    const deleteJobFunc = async (e) => {
        deleteJobData.id = e._id;
        deleteJobData.headline = e.headline;
        setShowDelete(true)
    }

    const yesDeleteFunc = async (e) => {
        setShowDelete(false)
        deleteJob(e);
    }

    const openJobDetails = async (e) => {
        jobDetailData._id = e._id;
        jobDetailData.hire_manager_id = e.hire_manager_id;
        e?.expected_duration_id && expectedDurationGetbyId(e.expected_duration_id);
        // jobDetailData.expected_duration_id = e.expected_duration_id;
        e?.complexity_id && complexityGetbyId(e.complexity_id);
        // jobDetailData.complexity_id = e.complexity_id;
        jobDetailData.description = e.description;
        e?.main_skill_id && skillsGetbyId(e.main_skill_id);
        // jobDetailData.main_skill_id = e.main_skill_id;
        // paymentTypeGetbyId(e.payment_type_id)
        jobDetailData.payment_type_id = e.payment_type_id;
        jobDetailData.payment_amount = e.payment_amount;
        jobDetailData.headline = e.headline;
        jobDetailData.attachments = e.attachments;
        setShowJobDetail(true)
    }

    function IconType(type) {
        if (type.includes("jpg") || type.includes("jpeg") || type.includes("png")) {
            return fileImageO
        } else if (type.includes("spreadsheet")) {
            return fileExcelO
        } else if (type.includes("pdf")) {
            return filePdfO
        } else if (type.includes(".doc")) {
            return fileWordO
        } else if (type.includes("presentation")) {
            return filePowerpointO
        } else {
            return ic_folder
        }
    }

    return (
        <div className="main-page page-dashboard">
            <div className="container">
                <div className="row">

                    <div className="col-lg-4 left">

                    <div className="profile_info bg-white rounded shadow-sm">
                        <div className="seller-card">
                            <div className="clearfix">
                                <div className="user-online-indicator is-online " data-user-id="1152855">
                                    <i className="fa fa-circle"></i>online
                                </div>
                                <Link to="" className="ambassadors-badge">{user.type}</Link>
                            </div>
                            <div className="user-profile-info">

                                <div className="user-profile-image">
                                    <label className="user-pict rounded-circle">
                                        <Link to="" className="user-badge">
                                            <h3 className="text-uppercase">{user.first_name.slice(0,1)}{user.last_name.slice(0,1)}</h3>
                                        </Link>
                                    </label>
                                </div>

                                <div className="user-profile-label">
                                    <div className="username-line">
                                        <Link to="" className="seller-link">{user.first_name} {user.last_name}</Link>
                                    </div>
                                    <div className="oneliner-wrapper">
                                        <small className="oneliner">Expert in Cyber Security</small>
                                        <div className="ratings-wrapper">
                                            <p className="rating-text"><strong>5.0</strong> (1k+ reviews)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="border-bottom pb-4">
                                    <div className="d-flex align-items-center py-1">
                                        Response Rate
                                        <div className="font-weight-bold ml-auto d-flex align-items-center">
                                            <span className="btn btn-primary border-0 py-1 px-4 mr-2"></span> 100%
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center py-1">
                                        Delivered on Time
                                        <div className="font-weight-bold ml-auto d-flex align-items-center">
                                            <span className="btn btn-primary border-0 py-1 px-4 mr-2"></span> 100%
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center py-1">
                                        Order Completion
                                        <div className="font-weight-bold ml-auto d-flex align-items-center">
                                            <span className="btn btn-primary border-0 py-1 px-4 mr-2"></span> 100%
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-3">
                                    <div className="d-flex align-items-center py-1 h6">
                                        Earned in March
                                        <div className="font-weight-bold ml-auto d-flex align-items-center">
                                            $2334
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center py-1 h6">
                                        Response Time
                                        <div className="font-weight-bold ml-auto d-flex align-items-center">
                                            N/A
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                        {/* <div className="profile_info">
                            <div className="seller-card">
                                <div><Link to="" className="ambassadors-badge">{user.type}</Link></div>
                                <div className="user-profile-info">
                                    <div>
                                        <div className="user-profile-image">
                                            <label className="user-pict">
                                                <div className="pt-4">
                                                    <h3 className="text-uppercase profile-avatar">{user.first_name.slice(0, 1)}{user.last_name.slice(0, 1)}</h3>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="user-profile-label">
                                        <div className="username-line">
                                            <Link to="" className="seller-link">{user.first_name} {user.last_name}</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-stats-desc">
                                    <ul className="user-stats">
                                        <li className="pl-0"><Icon className="mr-2" icon={mapMarker} /> From<strong>{hireManager.location}</strong></li>
                                        //<li className="pl-0"><Icon className="mr-2" icon={userO} /> Member since<strong>{user.date.split('T')[0]}</strong></li>
                                        <li className="pl-0"><Icon className="mr-2" icon={userO} /> Member since<strong>{user.date == undefined ? "" :user.date.split('T')[0]}</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="seller-profile">
                            <div>
                                <h3>Overview</h3>
                                <p className="mt-2 p-2">{hireManager.overview}</p>
                            </div>
                            <div>
                                <h3>Company Name</h3>
                                <ul className="mt-2 p-2">
                                    <li>{hireManager.company_id[0]}</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4">Group of people you are looking for</h3>
                                {hireManager.skills_level_id.length > 0 && hireManager.skills_level_id.map((itemofSkills, index) => (
                                    <span className="mt-2 border border-primary p-2 rounded" key={index}>{itemofSkills}</span>
                                ))}
                            </div>
                            <div>
                                <h3>Level of experience you are looking for </h3>
                                <ul className="mt-2 p-3">
                                    <li>{hireManager.experience_level}</li>
                                </ul>
                            </div>
                                </div>*/}
                    </div>

                    <div className="col-lg-8 right">
                        <section className='bg-white rounded shadow-sm sidebar-page-right'>
                            <header className="box-title border-bottom px-4 py-3">
                                <div className="row align-items-center">
                                    <div className='col'>
                                        <h4 className="h4 m-0">Job you have posted</h4>
                                    </div>
                                    <div className='col text-right'>
                                        <Link to="/postjobclient" className="btn btn-sm btn-primary"> Post a Job </Link>
                                    </div>
                                </div>
                                
                            </header>
                            <div className="p-0">
                        <Alert />
                        {/* <h5 className="text-info font-weight-bold">Job you have posted:</h5> */}
                        {postJobData.length > 0 && [...postJobData].reverse().map(jobDataItem => (
                            <>
                                <Modal show={showDelete} size="md" aria-labelledby="containemdd-modal-title-vcenter" centered onHide={handleCloseDelete}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Delete Job - {deleteJobData.headline}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="container">
                                            <div className="row">
                                                <p>Are you sure you want to delete this job?</p>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={() => yesDeleteFunc(deleteJobData.id)}>
                                            Yes
                                        </Button>
                                        <Button variant="secondary" onClick={handleCloseDelete}>
                                            No
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={showJobDetail} size="md" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleCloseJobDetail}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Job Detail - {jobDetailData.headline}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-12">
                                                    <h6 className="text-primary">Description</h6>
                                                    <p className="text-muted text-justify">{jobDetailData.description}</p>
                                                    <h6 className="text-primary">Project Complexity</h6>
                                                    <p className="text-muted">{complexityLevel.complexity}</p>
                                                    <h6 className="text-primary">How long will work take?</h6>
                                                    <p className="text-muted">{expectedDurationVal.duration_text}</p>
                                                    <h6 className="text-primary">Main Skill</h6>
                                                    <p className="text-muted">{skills.skill_name}</p>
                                                    <h6 className="text-primary">Budget Type</h6>
                                                    <p className="text-muted">{jobDetailData.payment_type_id == "61d045790971f502007f5a9c" ? "Fixed" : "Hourly"}</p>
                                                    <h6 className="text-primary">Budget Amount</h6>
                                                    <p className="text-muted">{jobDetailData.payment_amount}</p>
                                                </div>
                                                {jobDetailData?.attachments?.length > 0 &&
                                                    <div className="col-12">
                                                        {jobDetailData.attachments.map((item) => <Icon className="mx-2 cursor text-primary" size="40" icon={IconType(item.file_type)} onClick={() => fileDownload(item.file_url, item.file_name)} />)}
                                                    </div>}
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseJobDetail}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <div className="border-bottom p-4 posted-jobs">
                                    <div className="pt-1">

                                        <div className="row">
                                            <div className="col-md-9">
                                                <span onClick={() => openJobDetails(jobDataItem)} className="cursorClass">
                                                    <h4 className="h4 mt-0 mb-3">{jobDataItem.headline}</h4>
                                                    <div className="text-gray">
                                                        <div className="mb-2 list-detail-items">
                                                           <ul>
                                                            <li><strong>Budget</strong> ${jobDataItem.payment_amount} {jobDataItem.payment_type_id == "61090602da79aa25b4318b49" ? "-- Fixed Amount Project" : "/ hr"}</li>
                                                            <li><strong>Posted</strong> {jobDataItem.job_post_time.split('T')[0]}</li>
                                                           </ul>
                                                        </div>
                                                    {jobDataItem.description.length > MAX_LENGTH ?
                                                        (
                                                            <p>
                                                                {`${jobDataItem.description.substring(0, MAX_LENGTH)}`} ....
                                                            </p>
                                                        ) :
                                                        <p className="mb-3">{jobDataItem.description}</p>
                                                    }
                                                    {jobDataItem.location && <><strong><SVGLocation/></strong> <span className="text-muted">{jobDataItem.location}</span></>}
                                                    </div>
                                                </span>
                                            </div>
                                            <div className="col-md-3">
                                                <p className="text-right"><button onClick={() => deleteJobFunc(jobDataItem)} className="btn btn-danger p-1"><Icon icon={trash} /></button></p>        
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            </>
                        ))}
                        {postJobData.length == 0 ?
                            <div class="p-5">
                                <div className="border bg-white p-5">
                                    <h6 className="text-primary text-center mb-0">You have no jobs</h6>
                                </div>
                            </div>
                            : ""}

                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    clientProfile: state.clientProfile,
    postJob: state.postJob,
});

export default connect(mapStateToProps, { setAlert, postJobGet, deleteJob, complexityGetbyId, expectedDurationGetbyId, paymentTypeGetbyId, skillsGetbyId })(ClientProfile);