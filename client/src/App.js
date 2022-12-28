import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// Redux
import { Provider } from "react-redux";

// import "./App.css";
import './styles/style.scss';
// import './styles/style.css';
import AppRoutes from './routes';
import store from './store';
// import { useNavigation } from '@react-navigation/native';

const App = () => {
  
  // const navigation = useNavigation();
  // const { dangerouslyGetState } = useNavigation();
  // const { index, routes } = dangerouslyGetState();

  useEffect(()=>{
    
    window.addEventListener("scroll", function(){
      let scrollPosition = document.getElementsByTagName('html')[0].scrollTop;
      if(scrollPosition>100){
        document.body.classList.add('sticky-header');
      }else{
        document.body.classList.remove('sticky-header');
      }
    });

  },[])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Header /> */}
          {/*<Alert />*/}
          <AppRoutes />
          {/* <Footer /> */}
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
