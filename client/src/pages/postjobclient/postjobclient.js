import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, Redirect, NavLink, useHistory } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { addPostJob, complexityGet, expectedDurationGet, paymentTypeGet } from "../../actions/postJob";
import { skillsGet } from "../../actions/clientProfile";
import { FileUploader } from "react-drag-drop-files";
import "./postjobclient.css"
import Icon from "react-icons-kit";
import { remove } from 'react-icons-kit/fa/remove'
import { uploadFile } from "../../actions/file-crud";

const PostJobClient = ({ clientProfile: { hireManager }, postJob: { postJobData, complexityLevel, expectedDurationVal, paymentTypeVal, skills }, setAlert, addPostJob, paymentTypeGet, complexityGet, expectedDurationGet, skillsGet, isAuthenticated }) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState({});
    const [fileArray, setFileArray] = useState([]);

    const fileTypes = ["JPEG", "PNG", "JPG", "PDF", "DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX"];

    const [formData, setFormData] = useState({
        expected_duration_id: "",
        complexity_id: "",
        description: "",
        main_skill_id: "",
        payment_type_id: "",
        payment_amount: "",
        headline: "",
        location: ""
    });

    useEffect(() => {
        complexityGet()
        expectedDurationGet()
        paymentTypeGet()
        skillsGet()
    }, []);
    useEffect(() => {
        if (Object.entries(file).length > 0) {
            setFileArray(Object.entries(file).filter(item => !isNaN(parseInt(item[0]))).map(item => item[1]));
        }
        if (Object.entries(file).length === 0 && fileArray.length > 0) {
            setFileArray([])
        }
    }, [file]);

    const { expected_duration_id,
        complexity_id,
        description,
        main_skill_id,
        payment_type_id,
        payment_amount,
        headline,
        location } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    let history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (fileArray.length > 0) {
            let formData = new FormData();
            for (let i = 0; i < fileArray.length; i++) {
                formData.append("files", fileArray[i]);
            }
            Promise.all([dispatch(uploadFile(formData,true))]).then(res => {
                let attachments = res[0].map((item=>({
                    file_name:item.key,
                    file_type:item.mimetype,
                    file_url:item.location
                })))
                var location = hireManager.location;
            addPostJob({
                expected_duration_id,
                complexity_id,
                description,
                main_skill_id,
                payment_type_id,
                payment_amount,
                headline,
                location,
                attachments
            });
            setFormData({});
            history.push("/clientprofile");
            })
        }
        else {
            var location = hireManager.location;
            addPostJob({
                expected_duration_id,
                complexity_id,
                description,
                main_skill_id,
                payment_type_id,
                payment_amount,
                headline,
                location
            });
            setFormData({});
            history.push("/clientprofile");
        }
    };

    
    const handleChange = (file) => {
        setFile(file);
    };

    const deleteFile = (index) => {
        let state = { ...file };
        delete state[index];
        setFile(state);
    }

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return (
        <section className="main-page page-dashboard">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bg-white rounded shadow-sm sidebar-page-right">
                            <div>
                                <div className="p-5 border-bottom">
                                    <form onSubmit={(e) => onSubmit(e)}>
                                        <div className="row d-flex align-items-center form-group pt-3">
                                            <div className="col-md-12 col-12">
                                                <p className="font-weight-bold mb-1">Headline</p>
                                            </div>
                                            <div className="col-md-10 col-12">
                                                <input type="text" className="form-control"
                                                    name="headline"
                                                    value={headline}
                                                    onChange={(e) => onChange(e)} />
                                            </div>
                                            <div className="col-md-12 col-12 mt-3">
                                                <p className="font-weight-bold mb-2">Describe your job</p>
                                                <p>This is how talent figures out what you need and why you're great to work with!</p>
                                                <p>Include your expectations about the task or deliverable, what you're looking for in a work relationship, and anything unique about your project, team or company, <Link to="#">Here are several examples</Link> that ilustrate best practice for effective job posts.</p>
                                            </div>
                                            <div className="col-md-10 col-12">
                                                <textarea className="form-control"
                                                    name="description"
                                                    value={description}
                                                    onChange={(e) => onChange(e)}
                                                    placeholder="Already have a job description? Paste it here!" rows="7"></textarea>
                                            </div>

                                            <div className="col-md-12 col-12 mt-2">
                                                <p className="font-weight-bold mb-0">Project Complexity?</p>
                                            </div>
                                            {complexityLevel.length > 0 && complexityLevel.map((itemofcomplexityLevel, index) => (
                                                <div className="col-md-12 col-12 mt-2">
                                                    <input type="radio" name="complexity_id" value={itemofcomplexityLevel._id} onChange={(e) => onChange(e)} /><span className="font-weight-bold ml-2">{itemofcomplexityLevel.complexity}</span>
                                                </div>
                                            ))}

                                            <div className="col-md-12 col-12 mt-2">
                                                <p className="font-weight-bold">How long will your work take?</p>
                                                <ul>
                                                    {expectedDurationVal.length > 0 && expectedDurationVal.map((itemofexpectedDurationVal, index) => (
                                                        <li><input type="radio" name="expected_duration_id" value={itemofexpectedDurationVal._id} onChange={(e) => onChange(e)} /><span className=" ml-1">{itemofexpectedDurationVal.duration_text}</span></li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="col-md-12 col-12 mt-2 mb-2">
                                                <p className="font-weight-bold mb-1">Main Skill</p>
                                                <select className="form-control" name="main_skill_id" onChange={(e) => onChange(e)}>
                                                    <option>select</option>
                                                    {skills.length > 0 && skills.map((itemofskills, index) => (
                                                        <option value={itemofskills._id}>{itemofskills.skill_name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-12 col-12 mb-2">
                                                <p className="font-weight-bold mb-1">Budget Type</p>
                                            </div>
                                            <div className="row ml-2">
                                                {paymentTypeVal.length > 0 && paymentTypeVal.map((itemofpaymentTypeVal, index) => (
                                                    <div className="col-md-12 col-12 mb-2">
                                                        <input type="radio" name="payment_type_id" value={itemofpaymentTypeVal._id} onChange={(e) => onChange(e)} /> <span className="font-weight-bold">{itemofpaymentTypeVal.type_name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="col-md-12 col-12">
                                                <p className="font-weight-bold mb-1">Budget Amount</p>
                                                <input type="text" className="form-control col-md-4 mb-3"
                                                    placeholder="$00.00"
                                                    name="payment_amount"
                                                    value={payment_amount}
                                                    onChange={(e) => onChange(e)} />
                                            </div>
                                            <div className="col-md-12 col-12">
                                                <p className="font-weight-bold mb-1">Attachments</p>
                                                <FileUploader
                                                    classes={`drag-drop`}
                                                    multiple={true}
                                                    handleChange={handleChange}
                                                    name="file"
                                                    types={fileTypes}
                                                />
                                                <div className="col-md-12 col-12 mt-2">
                                                    {fileArray.length > 0 && (
                                                        fileArray.map((item, index) => (
                                                            <p className="font-weight-bold mb-1"><Icon className="mx-2" icon={remove} onClick={() => deleteFile(index)} /> {item.name}</p>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-12">
                                                <Link to="/budget" className="btn btn-normal">Back</Link>
                                            </div>
                                            <div className="col-md-6 col-12 text-right">
                                                <button className="btn btn-primary" type="submit" >
                                                    Post Your Job Now
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

PostJobClient.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    postJob: state.postJob,
    clientProfile: state.clientProfile
});


export default connect(mapStateToProp, { setAlert, addPostJob, complexityGet, expectedDurationGet, paymentTypeGet, skillsGet })(PostJobClient);