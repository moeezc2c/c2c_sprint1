import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { userPlus } from 'react-icons-kit/fa/userPlus'
import { sellsy } from 'react-icons-kit/fa/sellsy'
import { list } from 'react-icons-kit/fa/list'
import { dollar } from 'react-icons-kit/fa/dollar'
import { Column } from '@ant-design/charts';
import { Pie } from '@ant-design/charts';
import { Line } from '@ant-design/charts';
import { getPendingJobs } from '../../actions/adminDashboard';
import PendingJobModal from "./pendingJobModal";

var data = [
  {
    name: 'Fixed Project',
    xfieldData: 'Jan.',
    yfieldData: 35000,
  },
  {
    name: 'Fixed Project',
    xfieldData: 'Feb.',
    yfieldData: 69000,
  },
  {
    name: 'Fixed Project',
    xfieldData: 'Mar.',
    yfieldData: 22500,
  },
  {
    name: 'Fixed Project',
    xfieldData: 'Apr.',
    yfieldData: 60000,
  },
  {
    name: 'Fixed Project',
    xfieldData: 'May',
    yfieldData: 50000,
  },
  {
    name: 'Fixed Project',
    xfieldData: 'Jun.',
    yfieldData: 60000,
  },
  {
    name: 'Fixed Project',
    xfieldData: 'Jul.',
    yfieldData: 75000,
  },
  {
    name: 'Fixed Project',
    xfieldData: 'Aug.',
    yfieldData: 10000,
  },
  {
    name: 'Hourly Project',
    xfieldData: 'Jan.',
    yfieldData: 45000,
  },
  {
    name: 'Hourly Project',
    xfieldData: 'Feb.',
    yfieldData: 82000,
  },
  {
    name: 'Hourly Project',
    xfieldData: 'Mar.',
    yfieldData: 35000,
  },
  {
    name: 'Hourly Project',
    xfieldData: 'Apr.',
    yfieldData: 93000,
  },
  {
    name: 'Hourly Project',
    xfieldData: 'May',
    yfieldData: 71000,
  },
  {
    name: 'Hourly Project',
    xfieldData: 'Jun.',
    yfieldData: 40000,
  },
  {
    name: 'Hourly Project',
    xfieldData: 'Jul.',
    yfieldData: 70000,
  },
  {
    name: 'Hourly Project',
    xfieldData: 'Aug.',
    yfieldData: 40000,
  },
];

var config = {
  data: data,
  isGroup: true,
  xField: 'xfieldData',
  yField: 'yfieldData',
  seriesField: 'name',
  label: {
    position: 'middle',
    layout: [
      { type: 'interval-adjust-position' },
      { type: 'interval-hide-overlap' },
      { type: 'adjust-color' },
    ],
  },
};

var dataPie = [
  {
    type: 'Pakistan',
    value: 27,
  },
  {
    type: 'UK',
    value: 25,
  },
  {
    type: 'USA',
    value: 18,
  },
  {
    type: 'Saudi Arabia',
    value: 15,
  },
  {
    type: 'UAE',
    value: 10,
  },
  {
    type: 'China',
    value: 5,
  },
];

var configPie = {
  appendPadding: 10,
  data: dataPie,
  angleField: 'value',
  colorField: 'type',
  radius: 0.8,
  label: {
    type: 'outer',
    content: '{name} {percentage}',
  },
  interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
};

var dataLastMonthSale = [
  {
    year: 'Jan',
    value: 1000,
  },
  {
    year: 'Feb',
    value: 1500,
  },
  {
    year: 'Mar',
    value: 3500,
  },
  {
    year: 'Apr',
    value: 5000,
  },
  {
    year: 'May',
    value: 4900,
  },
  {
    year: 'June',
    value: 6000,
  },
  {
    year: 'July',
    value: 7000,
  },
  {
    year: 'Aug',
    value: 9000,
  },
  {
    year: 'Sep',
    value: 13000,
  },
];

var configLastMonthSale = {
  data: dataLastMonthSale,
  xField: 'year',
  yField: 'value',
  label: {},
  point: {
    size: 5,
    shape: 'diamond',
    style: {
      fill: 'white',
      stroke: '#5B8FF9',
      lineWidth: 2,
    },
  },
  tooltip: { showMarkers: false },
  state: {
    active: {
      style: {
        shadowBlur: 4,
        stroke: '#000',
        fill: 'red',
      },
    },
  },
  interactions: [{ type: 'marker-active' }],
};

var dataLastWeekSale = [
  {
    year: 'week1',
    value: 3000,
  },
  {
    year: 'week2',
    value: 4000,
  },
  {
    year: 'week3',
    value: 3500,
  },
  {
    year: 'week4',
    value: 5000,
  }
];

var configLastWeekSale = {
  data: dataLastWeekSale,
  xField: 'year',
  yField: 'value',
  label: {},
  point: {
    size: 5,
    shape: 'diamond',
    style: {
      fill: 'white',
      stroke: '#5B8FF9',
      lineWidth: 2,
    },
  },
  tooltip: { showMarkers: false },
  state: {
    active: {
      style: {
        shadowBlur: 4,
        stroke: '#000',
        fill: 'red',
      },
    },
  },
  interactions: [{ type: 'marker-active' }],
};


const AdminDashboard = ({ auth: { isAuthenticated, user }, pendingJobs, getPendingJobs }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentJob, setCurrentJob] = useState(false);
  const [modal,setModal] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated && user.type === "Admin") {
      getPendingJobs();
    } else {
      history.push('/');
    }
  }, [isAuthenticated, user]);

  const MAX_LENGTH = 250;
  
  return (
    <React.Fragment>
      <div className="main-page second py-5">
        <div className="container-fluid">
          <div className="">
            <div className="d-flex align-items-center p-3 bg-white rounded shadow-sm h5 m-0">
              <b>Admin Dashboard</b>
              <div className="ml-auto d-flex align-items-center h5 m-0 text-muted">
                Name
              </div>
            </div>
            <div className="row p-3 mb-0">
              <div className="p-4 col-3 bg-white rounded shadow-sm">
                <h6 className="mb-2 font-weight-bold"><Icon size={42} className="mr-3" icon={userPlus} /> New Users
                </h6>
                <h6 className="m-0 text-center text-muted">250</h6>
              </div>
              <div className="p-4 col-3 bg-white rounded shadow-sm">
                <h6 className="mb-2 font-weight-bold"><Icon size={42} className="mr-3" icon={sellsy} /> Sales
                </h6>
                <h6 className="m-0 text-center text-muted">4021</h6>
              </div>
              <div className="p-4 col-3 bg-white rounded shadow-sm">
                <h6 className="mb-2 font-weight-bold"><Icon size={42} className="mr-3" icon={list} /> Completed Projects
                </h6>
                <h6 className="m-0 text-center text-muted">80</h6>
              </div>
              <div className="p-4 col-3 bg-white rounded shadow-sm">
                <h6 className="mb-2 font-weight-bold"><Icon size={42} className="mr-3" icon={dollar} /> Earnings
                </h6>
                <h6 className="m-0 text-center text-muted">5000</h6>
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-7 bg-white rounded shadow-sm p-4">
                <h5>This Year Sales </h5>
                <Column {...config} />
              </div>
              <div className="col-md-5 bg-white rounded shadow-sm p-4">
                <h5>Sales By Countries</h5>
                <Pie {...configPie} />
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-6 bg-white rounded shadow-sm p-4">
                <h6>Last Months Sales</h6>
                <p className="text-danger font-weight-bold">$40250</p>
                <Line {...configLastMonthSale} />
              </div>
              <div className="col-md-6 bg-white rounded shadow-sm p-4">
                <h6>Last Weeks Sales</h6>
                <p className="text-primary font-weight-bold">$10250</p>
                <Line {...configLastWeekSale} />
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-6 bg-white rounded shadow-sm p-4">
                <h6 className="mb-3">Top Earnings Projects</h6>
                <div className="row p-3 border border-dark rounded m-1">
                  <div className="col-md-8">
                    <h6>Cyber Security malware Analysts</h6>
                    <p className="text-muted mb-0">This is a project detail description</p>
                    <p className="text-danger mb-0">$5000</p>
                  </div>
                  <div className="col-md-4 text-right">
                    <Link to="/" className="btn btn-outline-primary">View Details</Link>
                  </div>
                </div>
                <div className="row p-3 border border-dark rounded m-1">
                  <div className="col-md-8">
                    <h6>Bug malware Security</h6>
                    <p className="text-muted mb-0">This is a project detail description</p>
                    <p className="text-danger mb-0">$4820</p>
                  </div>
                  <div className="col-md-4 text-right">
                    <Link to="/" className="btn btn-outline-primary">View Details</Link>
                  </div>
                </div>
                <div className="row p-3 border border-dark rounded m-1">
                  <div className="col-md-8">
                    <h6>Security Analysts</h6>
                    <p className="text-muted mb-0">This is a project detail description</p>
                    <p className="text-danger mb-0">$4100</p>
                  </div>
                  <div className="col-md-4 text-right">
                    <Link to="/" className="btn btn-outline-primary">View Details</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 bg-white rounded shadow-sm pt-4 pb-4">
                <h6>User activity <span className="text-muted">(Daily Basis)</span></h6>
                <div className="row p-3 border border-dark rounded">
                  <div className="col-md-4">
                    <p className="text-muted">Pages / Visit</p>
                    <h6>2065</h6>
                  </div>
                  <div className="col-md-4">
                    <p className="text-muted">New user</p>
                    <h6>465</h6>
                  </div>
                  <div className="col-md-4">
                    <p className="text-muted">Last week</p>
                    <h6>23456</h6>
                  </div>
                </div>
                <div className="row p-3 border border-dark rounded">
                  <div className="col-md-4">
                    <p className="text-muted">Pages / Visit</p>
                    <h6>435</h6>
                  </div>
                  <div className="col-md-4">
                    <p className="text-muted">New user</p>
                    <h6>5435643</h6>
                  </div>
                  <div className="col-md-4">
                    <p className="text-muted">Last week</p>
                    <h6>45435</h6>
                  </div>
                </div>
                <div className="row p-3 border border-dark rounded">
                  <div className="col-md-4">
                    <p className="text-muted">Pages / Visit</p>
                    <h6>545</h6>
                  </div>
                  <div className="col-md-4">
                    <p className="text-muted">New user</p>
                    <h6>54353</h6>
                  </div>
                  <div className="col-md-4">
                    <p className="text-muted">Last week</p>
                    <h6>4643</h6>
                  </div>
                </div>
              </div>
              {pendingJobs && pendingJobs.length > 0 && (
              <div className="col-md-6 bg-white rounded shadow-sm p-4">
                  <h6 className="mb-3">Pending Job requests</h6>
                  {pendingJobs.map((job, index) => (
                    <div onClick={()=>{ setModal(!modal); setCurrentJob(job)}} className="row mt-3 border border-primary p-3 bg-white">
                    <div className="col-md-12 pt-1">
                        <span className="cursorClass">
                            <h6 className="text-primary mb-0">{job.headline}</h6>
                            <p className="mb-0"><span className="font-weight-bold">${job.payment_amount}</span> {job.payment_type_id == "61090602da79aa25b4318b49" ? "-- Fixed Amount Project" : "/ hr"} </p>
                            <p><span className="font-weight-bold">Posted:</span> {job.job_post_time.split('T')[0]} </p>
                            {job.description.length > MAX_LENGTH ?
                                (
                                    <p>
                                        {`${job.description.substring(0, MAX_LENGTH)}`} ....
                                    </p>
                                ) :
                                <p className="font-weight-bold mb-3">{job.description}</p>
                            }
                            <p><span className="font-weight-bold">Status:</span> <span className="text-muted">{job.status}</span></p>
                        </span>
                    </div>
                </div>
                  ))}
                </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <PendingJobModal modal={modal} setModal={setModal} currentJob={currentJob}/>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  pendingJobs: state.adminDashboard.pendingJobs
});

export default connect(mapStateToProps, { getPendingJobs })(AdminDashboard);
