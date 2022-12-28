import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link, Redirect , NavLink } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import {facebookSquare} from 'react-icons-kit/fa/facebookSquare';
import {linkedinSquare} from 'react-icons-kit/fa/linkedinSquare';
import {mapMarker} from 'react-icons-kit/fa/mapMarker';
import {userO} from 'react-icons-kit/fa/userO';
import {clockO} from 'react-icons-kit/fa/clockO';
import {paperPlane} from 'react-icons-kit/fa/paperPlane';

const Finance = ({ auth: { isAuthenticated, user } }) => {

    const [formDataSetting, setFormDataSetting] = useState({
        full_name: user.first_name + " " + user.last_name,
        email: user.email,
      });

      const { full_name, email } = formDataSetting;

      const onChange = (e) => {
        setFormDataSetting({ ...formDataSetting, [e.target.name]: e.target.value });
      };
    
    return (<section className="main-page page-dashboard">
    <div className="container">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <h2 className="pull-left m-0 p-0">Revenue Earned</h2>
                        <p className="pull-right mb-0 mt-1 p-0">
                            Available For Withdrawal: <span className="font-weight-bold text-primary"> $5.00 </span>
                        </p>
                    </div>
                    <div className="col-md-12">
                        <div className="mb-3 border-0 bg-white shadow-sm rounded ">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3 text-center border-box">
                                        <p> Withdrawals </p>
                                        <h1 className="font-weight-bold m-0">$12,000</h1>
                                    </div>
                                    <div className="col-md-3 text-center border-box">
                                        <p> Used To Order Proposals/Services </p>
                                        <h1 className="font-weight-bold m-0">$1,00.50</h1>
                                    </div>
                                    <div className="col-md-3 text-center border-box">
                                        <p> Pending Clearance </p>
                                        <h1 className="font-weight-bold m-0">$-1015.00</h1>
                                    </div>
                                    <div className="col-md-3 text-center border-box">
                                        <p> Available Income </p>
                                        <h1 className="font-weight-bold m-0">$5.00</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="pull-left my-2 mr-2"> Withdraw To: </p>
                        <button className="btn btn-primary ml-2">
                            <i className="fa fa-paypal"></i> Paypal Account
                        </button>
                        <button className="btn btn-default ml-2">
                            <i className="fa fa-university"></i> Bank Account
                        </button>
                        <button className="btn btn-default ml-2">
                            <i className="fa fa-credit-card"></i> Moneygram
                        </button>
                        <button className="btn btn-default ml-2">
                            <i className="fa fa-bitcoin"></i> Bitcoin Wallet
                        </button>
                        <div className="table-responsive box-table mt-4 bg-white rounded shadow-sm p-2">
                            <table className="table table-bordered m-0">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>For</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>March 02, 2021</td>
                                        <td>
                                            Order Revenue (<Link to="" target="blank" className="text-primary"> View Order </Link>)
                                        </td>
                                        <td className="text-primary"> +$23.75 </td>
                                    </tr>
                                    <tr>
                                        <td>February 16, 2021</td>
                                        <td>
                                            Order Tip Revenue (<Link to="" target="blank" className="text-primary"> View Order </Link>)
                                        </td>
                                        <td className="text-primary"> +$4.00 </td>
                                    </tr>
                                    <tr>
                                        <td>February 16, 2021</td>
                                        <td>
                                            Order Revenue (<Link to="" target="blank" className="text-primary"> View Order </Link>)
                                        </td>
                                        <td className="text-primary"> +$11.40 </td>
                                    </tr>
                                    <tr>
                                        <td>February 04, 2021</td>
                                        <td>
                                            Order Revenue (<Link to="" target="blank" className="text-primary"> View Order </Link>)
                                        </td>
                                        <td className="text-primary"> +$9.50 </td>
                                    </tr>
                                    <tr>
                                        <td>January 31, 2021</td>
                                        <td>
                                            Order Revenue (<Link to="" target="blank" className="text-primary"> View Order </Link>)
                                        </td>
                                        <td className="text-primary"> +$38.00 </td>
                                    </tr>
                                    <tr>
                                        <td>January 23, 2021</td>
                                        <td>
                                            Order Revenue (<Link to="" target="blank" className="text-primary"> View Order </Link>)
                                        </td>
                                        <td className="text-primary"> +$47.50 </td>
                                    </tr>
                                    <tr>
                                        <td>January 22, 2021</td>
                                        <td>
                                            Order Tip Revenue (<Link to="" target="blank" className="text-primary"> View Order </Link>)
                                        </td>
                                        <td className="text-primary"> +$5.00 </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                    </div>
                </div>
            </div>
        </section>
    )

}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Finance);