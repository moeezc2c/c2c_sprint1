import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Alert from '../../components/alert/Alert';
import Input from '../../components/input/input';
import { SVGWidgetLogo, FormIcon } from '../../components/SVG'

const Login = ({ setAlert, login, isAuthenticated, user }) => {

  const history = useHistory();
  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
  });

  const { user_name, password } = formData;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/secureaccount");
    }
  },[isAuthenticated])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(user_name, password,()=>history.push('/optAuth'));
  };

  return (
    <section className="box-under-container page-login page-auth">
      <div className="container">
        <section className="box-shadow m-auto">
          <div className="text-center logo">
            <Link to="/">
              <SVGWidgetLogo />
            </Link>
          </div>
          <h3 className="heading">Welcome Back</h3>
          <p className="description">
            Don't miss your next opportunity.<br />
            Sign in to stay updated on your professional world.
          </p>
          <Alert />
          <form onSubmit={(e) => onSubmit(e)}>
            <Input
              parentclass={`user`}
              labelfor={`userName`}
              id={`user1`}
              className={'error'}
              // label={`Username`}
              group={true}
              name={'user_name'}
              placeholder={`Username`}
              icon={<FormIcon icon={'user'} />}
              required={true}
              type={'text'}
              value={formData.user_name}
              handlerOnChange={(e) => onChange(e)}
            >
            </Input>
            <Input
              parentclass={`password`}
              labelfor={`password`}
              id={`user1`}
              className={'error'}
              // label={`Username`}
              group={true}
              name={'password'}
              placeholder={`Password`}
              icon={<FormIcon icon={'password'} />}
              required={true}
              type={'password'}
              handlerOnChange={(e) => onChange(e)}
              minLength={6}
              value={password}
            >
            </Input>
            <div className="row justify-content-between">
              <div className="col-lg-6 col-md-6 col-xs-12 col-sm-6 remember-password">
                <div className="custom-control custom-checkbox mb-3">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-xs-12 col-sm-6 forget-password">
                <Link to="/ForgetPassword">Forgot password?</Link>
              </div>
            </div>
            <button
              className="btn btn-default btn-block"
              type="submit"
            >
              Get Started
            </button>
            <div className="py-3 d-flex align-item-center join-now">
              <span className="ml-auto"> New to freelance? <Link to="/register">Join now</Link></span>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProp, { setAlert, login })(Login);
