import React from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import {SVGLocation} from '../../components/SVG';

const Report = ({ auth: { isAuthenticated, user } }) => {
    return (<>
        <section className="main-page page-dashboard">
            <div className="container">
                
            <main className="panel-box">
                <div className="panel-box--wrap">
                    <header className="panel-box--header">
                        <h2 className="panel-box--title">Report</h2>
                    </header>
                    <main className="panel-box--body">
                        <h4 className="h4 mt-0 mb-3">Quia delectus volup</h4>
                        <div className="text-gray">
                            <div className="mb-2 list-detail-items">
                                <ul>
                                <li><strong>Budget</strong> $7777 / hr</li>
                                <li><strong>Posted</strong> 2022-05-21</li>
                                </ul>
                            </div>
                            <p className="mb-3">Ullamco ipsum enim</p>                                                    
                            <strong><SVGLocation/></strong> 
                            <span className="text-muted">Equatorial Guinea</span>
                        </div>
                    </main>
                </div>
            </main>

            </div>
        </section>
    </>)
};

const mapStateToProp = (state) => ({
    auth: state.auth,
});
  
  export default connect(mapStateToProp)(Report);