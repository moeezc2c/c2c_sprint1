import React, { Fragment, useState, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import {SVGLogin, SVGSignUp} from "../SVG";
// import NavbarMain from "../navbar/Navbar";

import { Icon } from 'react-icons-kit';
import { user } from 'react-icons-kit/fa/user';
import { signIn } from 'react-icons-kit/fa/signIn';
import { userPlus } from 'react-icons-kit/fa/userPlus';
import { alignLeft } from 'react-icons-kit/fa/alignLeft';
import { signOut } from 'react-icons-kit/fa/signOut';
import { cog } from 'react-icons-kit/fa/cog';
import { dollar } from 'react-icons-kit/fa/dollar';
import { Logo } from "../../components/logo/Logo";
import useWindowSize from "../../customHooks/windowResize";
import {menu} from 'react-icons-kit/icomoon/menu';

const Header = ({ auth: { isAuthenticated, loading, user }, logout, type }) => {
//const Header = ({ auth: { isAuthenticated, loading, user }, logout, type }) => { 

  const [userDropdown, setUserDropdown] = useState(false);
  //const user = auth.user;
  
  // const [windowSize, setWindowSize] = useState({
  //   width: undefined,
  //   height: undefined,
  // });

  // // Check Mobile Responsive
  // useEffect(() => {
  //   // Handler to call on window resize
  //   function handleResize() {
  //     // Set window width/height to state
  //     setWindowSize({
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     });
  //   }
  //   // Add event listener
  //   window.addEventListener("resize", handleResize);
  //   // Call handler right away so state gets updated with initial window size
  //   handleResize();
  //   // Remove event listener on cleanup
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  
  
  const toggleUserDropdown = (e) => {
    e.preventDefault();
    setUserDropdown((prev) => !prev);
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      className="btn btn-icon btn-transparent-dark"
      href="#!"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {/*<img className="img-fluid" src="assets/images/BilalAhmedProfile.jpg" />*/}
      <div className="border border-info rounded-circle pt-2 bg-dark-teal text-light">
        <h5 className="text-uppercase">{user.first_name.slice(0, 1)}{user.last_name.slice(0, 1)}</h5>
      </div>
    </Link>
  ));

  const CustomMenu = React.forwardRef(
    ({ style, className, 'aria-labelledby': labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <h6 className="dropdown-header d-flex align-items-center">
            {/*<img className="dropdown-user-img" src="assets/images/BilalAhmedProfile.jpg" alt="" />*/}
            <div className="border border-primary rounded-circle pt-4">
              <h3 className="text-uppercase">{user.first_name.slice(0, 1)}{user.last_name.slice(0, 1)}</h3>
            </div>
            <div className="dropdown-user-details">
              <div className="dropdown-user-details-name">
                {user.first_name} {user.last_name}
              </div>
              <div className="dropdown-user-details-email">{user.email}</div>
            </div>
          </h6>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="/profile">
            <div className="dropdown-item-icon">
              <Icon icon={alignLeft} />
            </div>
            Profile
          </Link>
          <Link className="dropdown-item" to="/settings">
            <div className="dropdown-item-icon">
              <Icon icon={cog} />
            </div>
            Account Settings
          </Link>
          <Link className="dropdown-item" href="#!" onClick={logout}>
            <div className="dropdown-item-icon">
              <Icon icon={signOut} />
            </div>
            Logout
          </Link>
        </div>
      );
    },
  );



  const authLinks = () => { 
    return (
    <ul className="navbar-nav align-items-center ml-auto">
      <li className="nav-item dropdown no-arrow no-caret dropdown-user">
        <Dropdown>
          {/* <span className="user-name"> {user.first_name} {user.last_name} </span> */}
          <Dropdown.Toggle as={CustomToggle}>
            Custom toggle
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu-right">
            <Dropdown.Item eventKey="1">
              <h6 className="dropdown-header d-flex align-items-center p-1">
                {/*<img className="dropdown-user-img" src="assets/images/BilalAhmedProfile.jpg" alt="" />*/}
                <div className="border border-info rounded-circle text-primary pt-3 pr-2 pl-2 mr-2">
                  <p className="text-uppercase font-weight-bold">{user.first_name.slice(0, 1)}{user.last_name.slice(0, 1)}</p>
                </div>
                <div className="dropdown-user-details">
                  <div className="dropdown-user-details-name">
                    {user.first_name} {user.last_name}
                  </div>
                  <div className="dropdown-user-details-email">{user.email}</div>
                </div>
              </h6>
            </Dropdown.Item>
            <div className="dropdown-divider"></div>
            {user.type == 'Freelancer'
              ?
              <Dropdown.Item eventKey="3" as={Link} to="/profile">
                <span className="menu-icon"><Icon icon={alignLeft} /></span>
                <span className="menu-text">Profile</span>
              </Dropdown.Item>
              :
              user.type !== "Admin" && <Dropdown.Item eventKey="3" as={Link} to="/clientprofile"><Icon
                icon={alignLeft} /> <span className="mt-1 ml-2">Profile</span></Dropdown.Item>
            }

            <Dropdown.Item eventKey="4" as={Link} to="/contract">
              <span className="menu-icon"><Icon icon={cog} /></span>
              <span className="menu-text">Contract</span>
            </Dropdown.Item>
            <Dropdown.Item eventKey="4" as={Link} to="/settings">
              <span className="menu-icon"><Icon icon={cog} /></span>
              <span className="menu-text">Account Settings</span>
            </Dropdown.Item>

            {user.type !== "Admin" && <Dropdown.Item eventKey="4" as={Link} to="/finance">
              <span className="menu-icon"><Icon icon={dollar} /></span> 
              <span className="menu-text">Earnings</span>
            </Dropdown.Item>}

            {user.type === "Admin" &&<Dropdown.Item eventKey="5" as={Link} to="/admindashboard">
              <span className="menu-text">Admin Dashboard</span></Dropdown.Item>}
            
            {/*<Dropdown.Item eventKey="6" as={Link} href="#!" onClick={logout}>*/}
            <Dropdown.Item eventKey="6" as={Link} to="/login" onClick={logout}>
              
                <span className="menu-icon"><Icon icon={signOut} /></span> 
                <span className="menu-text">Logout</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    </ul>
  );
  };

  const guestLinks = ()=> {
    return (
    <>
      <li className="nav-item">
        <NavLink to="/register" className="nav-link">
          {/* <Icon icon={userPlus} />  */}
          <SVGSignUp/>
        Signup</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/login" className="nav-link ml-md-0 ml-4">
          {/* <Icon icon={signIn} />  */}
          <SVGLogin/>        
        Login</NavLink>
      </li>
      </>
  );
  };

  const guestLinksMain = () => { 
    return (
    <React.Fragment>
      {/* <li className="nav-item">
        <NavLink className="nav-link" to="/">Home</NavLink>
      </li> */}
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/job">Job</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/talent">Talent</NavLink>
      </li>
    </React.Fragment>
    );
  };

  const authLinksMain = () => { 
    return (
    <React.Fragment>
      {/* <li className="nav-item">
        <NavLink exact className="nav-link" to="/">Home</NavLink>
      </li> */}
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
      </li>
      {
        user.type == "Freelancer" ?
          <li className="nav-item">
            <NavLink className="nav-link" to="/job">Job</NavLink>
          </li>
          :
          <li className="nav-item">
            <NavLink className="nav-link" to="/talent">Talent</NavLink>
          </li>
      }
      <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/report">Report</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/messages">Messages</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/completeprofile">Complete Profile</NavLink>
      </li>
    </React.Fragment>
  );
  };

  let windowSize = useWindowSize();
  // const [mobileMode, setMobileMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(()=> {
    // if(windowSize.width <= 768){
    //   setMobileMode(true);
    // }else{
    //   setMobileMode(false);
    // }    
  },[windowSize]);


  const HeaderDefault = ()=> {
    return (<>
      <header className={`main-header ${type === 3 ? 'light':''}`}>
            {/* <NavbarMain /> */}
            <nav className="navbar navbar-expand-lg navbar-light topbar static-top shadow-sm bg-dark-teal osahan-nav-top">
              <div className="container-fluid">
                <div className="mobile-row">
                  <Logo />
                  <button className="navbar-toggler" type="button" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}>
                    {/* <span className="navbar-toggler-icon"></span> */}
                    <Icon icon={menu}/>
                  </button>
                </div>
                

                <>
                    {!loading && (
                      <Fragment>{isAuthenticated ? (<><ul className="navbar-nav align-items-center ml-auto">{user.type !== 'Admin' ? authLinksMain() : null} </ul>{ authLinks()}</>) : <><ul className="navbar-nav align-items-center ml-auto">{guestLinksMain()} {guestLinks()} </ul></> }</Fragment>
                    )}
                  </>
                
                
              </div>
            </nav>
      </header>
      
      </>
    )
  }//HeaderDefault

  const HeaderDark = ()=> {
    
    return (<>
    <header className="main-header dark">
        <nav className="navbar navbar-expand-lg navbar-light topbar static-top shadow-sm bg-dark-teal osahan-nav-top px-0">
          <div className="container-fluid">
            <div className="mobile-row">
              <Logo type={2} />
              <button className="navbar-toggler" type="button" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}>
                {/* <span className="navbar-toggler-icon"></span> */}
                <Icon icon={menu}/>
              </button>
            </div>

            {!loading && (
                  <Fragment>{isAuthenticated ? (<><ul className="navbar-nav align-items-center ml-auto">{authLinksMain()} {authLinks()}</ul></>) : <><ul className="navbar-nav align-items-center mr-auto">{guestLinksMain()}</ul><ul className="navbar-nav align-items-center ml-auto">{guestLinks()} </ul></> }</Fragment>
                )}
            
          </div>
        </nav>
        </header>
        
    </>
    )}


  return (<>
    {type ?
          <>
          {(type === 1 || type === 3) && <HeaderDefault/> }
          {type === 2 && <HeaderDark/>}
          </>
    :
    <HeaderDefault/>
    }

      {mobileMenuOpen && <>
        {!loading && (<>
              <div className="mobile-menu">{isAuthenticated ? (<>
                {/* { authLinks()} */}
                <ul className="navbar-nav align-items-center ml-auto">
                  <li className="nav-item dropdown no-arrow no-caret dropdown-user">

                      
                          <h6 className="dropdown-header d-flex align-items-center p-1">
                            {/*<img className="dropdown-user-img" src="assets/images/BilalAhmedProfile.jpg" alt="" />*/}
                            <div className="border border-info rounded-circle text-primary pt-3 pr-2 pl-2 mr-2">
                              <p className="text-uppercase font-weight-bold">{user.first_name.slice(0, 1)}{user.last_name.slice(0, 1)}</p>
                            </div>
                            <div className="dropdown-user-details">
                              <div className="dropdown-user-details-name">
                                {user.first_name} {user.last_name}
                              </div>
                              <div className="dropdown-user-details-email">{user.email}</div>
                            </div>
                          </h6>
                      </li>
                      </ul>
                      <div className="dropdown-divider"></div>
                      <ul className="navbar-nav align-items-center ml-auto">                      
                        {user.type == 'Freelancer'
                          ?
                          <li className="nav-item"><NavLink className="nav-link" to="/profile">
                            <span className="menu-icon"><Icon icon={alignLeft} /></span>
                            <span className="menu-text">Profile</span>
                          </NavLink></li>
                          :
                          user.type !== "Admin" && <li className="nav-item"><NavLink className="nav-link" to="/clientprofile">
                            <span className="menu-icon"><Icon icon={alignLeft} /></span> 
                            <span className="menu-text">Profile</span></NavLink></li>
                        }
                      
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/contract">
                          <span className="menu-icon"><Icon icon={cog} /></span>
                          <span className="menu-text">Contract</span>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/settings">
                          <span className="menu-icon"><Icon icon={cog} /></span>
                          <span className="menu-text">Account Settings</span>
                        </NavLink>
                      </li>
                      
                        {user.type !== "Admin" && <li className="nav-item"><NavLink className="nav-link" to="/finance">
                          <span className="menu-icon"><Icon icon={dollar} /></span> 
                          <span className="menu-text">Earnings</span>
                        </NavLink></li>}
                      
                      
                        {user.type === "Admin" &&<li className="nav-item"><NavLink className="nav-link" to="/admindashboard">
                          <span className="menu-text">Admin Dashboard</span></NavLink></li>}
                          
                      <li className="nav-item"> 
                        <NavLink className="nav-link" href="#!" to="#!" onClick={logout}>
                            <span className="menu-icon"><Icon icon={signOut} /></span> 
                            <span className="menu-text">Logout</span>
                        </NavLink>           
                      </li>
                    </ul>
                    
                    <div className="dropdown-divider"></div>

                    <ul className="navbar-nav align-items-center ml-auto">
                      {user.type !== 'Admin' ? authLinksMain() : null} 
                    </ul></>) 
              : 
              <><ul className="navbar-nav align-items-center ml-auto">
                  {guestLinksMain()} {guestLinks()} 
                </ul>
              </> }
              </div>
              <div className="overlay" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}></div>
              </>
            )}
          </>} 
    </>
  );
};


Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  type: PropTypes.number
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
