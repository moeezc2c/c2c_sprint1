import React, { useEffect } from 'react'
import OtpInput from 'react-otp-input';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { otpVerification } from '../../actions/auth';
import Alert from '../../components/alert/Alert';
import './style.scss'

const OtpAuth = ({id,otpVerification}) => {

    const [value, setValue] = React.useState('');
    const history = useHistory();
    
    useEffect(() => {
        if(!id){
            history.push('/login')
        }
    },[])
    
    useEffect(() => {
        if(value.length === 6){
            otpVerification(value,id,()=>history.push('/'),()=>{setValue('')})
        }
    },[value])

    return (
        <div className="container otp-main">
            <h1>
                Kindly Enter the verificatrion code sent to your mobile number
            </h1>
            <OtpInput
                isInputNum={true}
                value={value}
                onChange={setValue}
                numInputs={6}
                separator={<span>-</span>}
            />
            <br/>
            <Alert/>
        </div>
    )
}

const mapStateToProp = (state) => ({
    id: state.auth.Otp_auth.id
});

export default connect(mapStateToProp,{otpVerification})(OtpAuth);