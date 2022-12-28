import React,{useState} from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
//import { enableMFA } from '../../actions/auth';
import Alert from '../../components/alert/Alert';

//const SecureAccount = ({enableMFA}) => {
const SecureAccount = () => {  
    const history = useHistory();
    const [toggle, settoggle] = useState(1);
  return (
    <section className="box-under-container page-login page-sa page-auth">
      <div className="container">
        <section className="box-shadow m-auto">
            <h3 className="heading">Secure Your Account</h3>
            <p className="description mb-1">Add an extra layer of protection to to your Cyber 2 Cyber account.</p>
            <p className="description">Enroll in Multi-Factor Authentication (MFA) using OTP Authenticator</p>
            <div  className="panel-body panel-left panel-small-margin">
                
                <div className="row form-group">
                    <div className="col-md-6 col-xs-12">
                        {toggle === 1 ? 
                        <button className="btn btn-primary btn-lg btn-block" onClick={()=>settoggle(2)}>Continue</button>:
                        <button className="btn btn-primary btn-lg btn-block">Do you want enable MFA</button>} 
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <button className="btn btn-default btn-block" onClick={() => history.push('/Dashboard')}>Later</button>
                    </div>
                </div>
            </div>
            <div>
                <Alert/>
            </div>
            {/* <div  className="panel-body panel-center panel-small-margin">
                
            </div> */}
            <div className="panel-footer">
                <a href="">Learn more: Keeping your account secure</a>
            </div>
    </section>
      </div>
    </section>
  )
}

const mapStateToProp = (state) => ({
    
});

//export default connect(mapStateToProp,{enableMFA})(SecureAccount)
export default connect(mapStateToProp)(SecureAccount)
