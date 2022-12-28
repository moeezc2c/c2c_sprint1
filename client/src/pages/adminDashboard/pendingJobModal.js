import Icon from 'react-icons-kit'
import {Form} from 'react-bootstrap'
import React, { useState } from 'react'
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch } from "react-redux";
import { fileDownload } from '../../actions/file-crud';
import { filePdfO } from 'react-icons-kit/fa/filePdfO';
import { fileWordO } from 'react-icons-kit/fa/fileWordO';
import { ic_folder } from 'react-icons-kit/md/ic_folder';
import { fileExcelO } from 'react-icons-kit/fa/fileExcelO';
import { fileImageO } from 'react-icons-kit/fa/fileImageO';
import { filePowerpointO } from 'react-icons-kit/fa/filePowerpointO';
import { getPendingJobs, updateJobStatus } from '../../actions/adminDashboard';

const PendingJobModal = ({ modal, setModal, currentJob }) => {

    const [status,setStatus]=useState(null)
    const [editorState,setEditorState]= useState(null);
    const dispatch = useDispatch();

    const handleSave = () => {
        let body ={
            status:status,
            reason:editorState ? editorState : null,
            email:currentJob.hire_manager_id.email,
            job_id:currentJob._id
        }
        dispatch(updateJobStatus(body,()=>{dispatch(getPendingJobs());setModal(false);}))
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
        <Modal show={modal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={() => setModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Job Detail - {currentJob.headline}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h6 className="text-primary">Description</h6>
                            <p className="text-muted p-3 text-justify">{currentJob.description}</p>
                            <h6 className="text-primary">Budget Type</h6>
                            <p className="text-muted">{currentJob.payment_type_id == "61d045790971f502007f5a9c" ? "Fixed" : "Hourly"}</p>
                            <h6 className="text-primary">Budget Amount</h6>
                            <p className="text-muted">{currentJob.payment_amount}</p>
                        </div>
                        {currentJob?.attachments?.length > 0 &&
                            <div className="col-12">
                                {currentJob.attachments.map((item) => <Icon className="mx-2 cursor text-primary" size="40" icon={IconType(item.file_type)} onClick={() => fileDownload(item.file_url, item.file_name)} />)}
                            </div>}
                    </div>
                    <div className="row">
                        <Form.Check
                            inline
                            label="Approve"
                            name="group1"
                            type='radio'
                            id="Approved"
                            onChange={(e)=>setStatus(e.target.id)}
                        />
                        <Form.Check
                            inline
                            label="Reject"
                            name="group1"
                            type='radio'
                            id="Rejected"
                            onChange={(e)=>setStatus(e.target.id)}
                        />
                    </div>
                    {status === "Rejected" && (<div>
                        <p>Provide reason</p>
                        <textarea value={editorState} onChange={(e)=>setEditorState(e.target.value)}
                        />
                    </div>)}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>handleSave()}>
                    Save
                </Button>
                <Button variant="secondary" onClick={() => setModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>)
}

export default PendingJobModal