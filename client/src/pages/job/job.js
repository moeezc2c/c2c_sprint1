import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, Redirect,  useHistory } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import Alert  from '../../components/alert/Alert';
import { Icon } from 'react-icons-kit';
import { filter } from 'react-icons-kit/fa/filter';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { postJobGetAll, deleteJob, complexityGetbyId, expectedDurationGetbyId, paymentTypeGetbyId, skillsGetbyId } from "../../actions/postJob";
import { addFreelancer, freelancerStatusGet } from "../../actions/freelancerProfile";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { Country } from 'country-state-city';


const Job = ({ freelancerProfile:{ freelancerStatus }, auth: { isAuthenticated }, postJob: { postJobData,  applyforjob },  postJobGetAll }) => {

  let history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    priceRange: "",
    projectType: "61d045790971f502007f5a9c",
    location: "Pakistan"
  });

  const { priceRange, projectType, location } = formData;

  const onChangeVal = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyForJob = async (e) => {
    applyforjob.id = e;
    history.push("/applyforjob");
  };

  const [state, setstate] = useState({
    value: { min: 10, max: 1000 }
  });

  const [value, setValue] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(freelancerStatusGet())
    if (isAuthenticated) {
      postJobGetAll();
    }
  }, []);

  const countries = Country.getAllCountries();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }


  return (
    <section className="main-page page-dashboard page-talent">
    <div className="container">
      <Alert/>
      <section className="bg-white rounded shadow-sm p-5 mb-3">
      <div className="row advanced-search">
        {!freelancerStatus && <div className="col-md-12 px-5">
          <div className="row d-flex align-items-center justify-content-between">
            <h5>Your Profile Is not active for bidding Kindly activate your profile</h5>
            <button className="btn btn-secondary" onClick={() =>dispatch(addFreelancer())}>Activate</button>
          </div>
        </div>}
        {freelancerStatus && <>
        <div className="col-md-10">
          <div className="input-group search-engine">
            <input type="text" value={value} onChange={e => setValue(e.target.value)} className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
            <div className="input-group-prepend">
              <Link to="#" className="btn btn-primary" id="basic-addon1"><i className="fa fa-search fa-fw p-0" aria-hidden="true"></i></Link>
            </div>
          </div>
        </div>
        <div className="col-md-2 pl-0">
          <Button onClick={handleShow} className="btn-filter btn btn-block btn btn-primary"><Icon icon={filter} /> Filters</Button>
          <Modal show={show} size="sm" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Search Jobs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <label className="form-label mb-3">Price Range</label>
                    <span className="p-5 mt-2">
                      <InputRange
                        maxValue={10000}
                        minValue={10}
                        value={state.value}
                        onChange={value => setstate({ value })} />
                    </span>
                  </div>
                  <div className="col-md-12 mt-3">
                    <label className="form-label">Project Type</label>
                    <ul className="options-list">
                      <li><input
                        name="projectType"
                        value={projectType}
                        onChange={(e) => onChangeVal(e)}
                        type="radio" checked={projectType == "61d0456e0971f502007f5a9b"} /> Hourly</li>
                      <li><input
                        name="projectType"
                        value={projectType}
                        onChange={(e) => onChangeVal(e)}
                        type="radio" checked={projectType == "61d045790971f502007f5a9c"} /> Fixed</li>
                    </ul>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 mt-3">

                    <div className="form-group cyber-form-control">
                      <label className="form-label">Country/Location</label>
                      <div className="input-group mb-3">
                        <select className="form-control"
                          name="location"
                          value={location}
                          onChange={(e) => onChangeVal(e)}>
                          <option>Please Select</option>
                          {
                            countries.map(item => <option value={item.name} data-isoCode={item.isoCode}>{item.name}</option>)
                          }
                        </select>
                      </div>
                  </div>

                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Search
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        </>}
      </div>
      </section>
                  
      <section className="bg-white rounded shadow-sm">
      {postJobData.length > 0 && [...postJobData].reverse()
        // .filter(jobDataItems => {
        //   let valueText = value.toLowerCase();
        //   if (!valueText) return true
        //   if (jobDataItems.headline.toLowerCase().includes(valueText)) {
        //     return true
        //   }
        // })
        // .filter(jobDataItems => jobDataItems.payment_amount > state.value.min && jobDataItems.payment_amount < state.value.max)
        // .filter(jobDataItems => jobDataItems.payment_type_id == projectType)
        // .filter(jobDataItems => jobDataItems.location == location)
        .map(jobDataItem => (
          <div className="freelancer-list">
          <div className="row">
            <div className="col-md-10 pt-1">
              <h3 className="text-primary mb-0">{jobDataItem.headline}</h3>
              <p className="mb-0"><span className="font-weight-bold">{jobDataItem.payment_amount}</span> {jobDataItem.payment_type_id == "61d045790971f502007f5a9c" ? "-- Fixed Amount Project" : "/ hr"}</p>
              <p><span className="font-weight-bold">Posted:</span> {jobDataItem.job_post_time.split('T')[0]} </p>
              <p className="mb-3">{`${jobDataItem.description.substring(0, 250)}`}</p>
              {jobDataItem.location && <p><span className="font-weight-bold">Location:</span> <span className="text-muted">{jobDataItem.location}</span></p>}
              {/*{ jobDataItem.verified == true && <p className="text-primary font-weight-bold"><Icon icon={checkCircleO} /> Verified Profile on CyberToCyber</p>}*/}
            </div>
            <div className="col-md-2 text-right">
              {/*<Link to="#" className="c-btn btn-info col-md-12 mb-2 font-weight-bold">Save Job</Link>*/}
              <button disabled={!freelancerStatus} onClick={() => applyForJob(jobDataItem._id)} className="btn btn-primary btn-sm col-md-12 mb-2">Apply for a job</button>
            </div>
          </div>
        </div>
        ))}
      {postJobData.length == 0 ?
        <div className="mt-5 p-5">
          <h6 className="text-primary text-center mb-0">Oops, There are no jobs available yet!</h6>
        </div>
        : ""}
        </section>

    </div>
    </section>
  );
};


const mapStateToProp = (state) => ({
  auth: state.auth,
  clientProfile: state.clientProfile,
  postJob: state.postJob,
  freelancerProfile: state.freelancerProfile,
});

export default connect(mapStateToProp, { setAlert, postJobGetAll, deleteJob, complexityGetbyId, expectedDurationGetbyId, paymentTypeGetbyId, skillsGetbyId })(Job);