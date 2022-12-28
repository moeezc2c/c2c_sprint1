import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { setAlert } from "../../actions/alert";
import { resetPassword } from '../../actions/auth';
import Alert from '../../components/alert/Alert';

const ChangePassword = () => {
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    const reset_type = new URLSearchParams(search).get('reset_type');
    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
        opt: ''
    });

    const { password, confirmPassword, opt } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        if (password !== confirmPassword) {
            return setAlert('Passwords do not match', 'danger');
        }
        if ((reset_type === 'phone' && opt === '') || (reset_type === 'email' && !token) || !password) {
            return setAlert('All feilds required', 'danger');
        }
        dispatch(resetPassword({
            token: reset_type === 'phone' ? opt : token,
            password,
        }))
    }
    return (
        <div className="bkg-login">
            <div className="container">
                <div className="row justify-content-center align-items-center d-flex">
                    <div className="col-lg-4 mx-auto">
                        <div className="osahan-login py-4">
                            <div className="text-center mb-4">
                                <Link to="/">
                                    <img src="assets/images/fav.svg" alt="" />
                                </Link>
                                <h5 className="font-weight-bold mt-3">Enter New Password</h5>
                                <p className="text-muted">
                                    Enter Your New Password:
                                </p>
                            </div>
                            <Alert />
                            <div className="form-group">
                                <label className="mb-1">Password</label>
                                <div className="position-relative ">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        required={true}
                                        value={password}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="mb-1">Confirm Password</label>
                                <div className="position-relative ">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        required={true}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                            </div>
                            {reset_type === 'phone' && <div className="form-group">
                                <label className="mb-1">OTP</label>
                                <div className="position-relative">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="opt"
                                        value={opt}
                                        required={true}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                            </div>}
                            <button className="btn btn-primary btn-block text-uppercase" type="button" onClick={onSubmit}> Change Password </button>

                        </div>
                        <div className="py-3 d-flex align-item-center">
                            <Link to="/login">Sign In</Link>
                            <span className="ml-auto"> New to freelance? <Link to="/register">Join now</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword