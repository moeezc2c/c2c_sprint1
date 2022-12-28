import React from 'react'
import { Route } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/footer';
import { ToastContainer } from 'react-toastify';


const MyRoute = (props) => {
    return (
        <>  {props.mode ?
                <Header type={props.mode} /> : <Header />
            }
            <ToastContainer  position='top-right'/>
            <Route {...props} />

            {props.mode ?
                <Footer type={props.mode} /> : <Footer />
            }
        </>
    )

}

export default MyRoute;