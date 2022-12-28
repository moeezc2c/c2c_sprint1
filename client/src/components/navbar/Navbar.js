import React, { Fragment, useState } from "react";
import { Link,useHistory, NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Icon } from 'react-icons-kit';
import { signIn } from 'react-icons-kit/fa/signIn';
import { userPlus } from 'react-icons-kit/fa/userPlus';
import { alignLeft } from 'react-icons-kit/fa/alignLeft';
import { signOut } from 'react-icons-kit/fa/signOut';
import { cog } from 'react-icons-kit/fa/cog';
import { dollar } from 'react-icons-kit/fa/dollar';
import { Logo } from "../../components/logo/Logo";
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import {SVGLogin, SVGSignUp} from "../SVG";

const NavbarMain = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const [userDropdown, setUserDropdown] = useState(false);
  const history = useHistory();

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
          {/*<Link className="dropdown-item" href="#!" onClick={()=>logout(()=>history.push('/'))}>*/}
          <Link className="dropdown-item" href="#!" onClick={()=>logout(()=>history.push('/login'))}>

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
          <span className="text-light mr-2"> {user.first_name} {user.last_name} </span>
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
              <Dropdown.Item eventKey="3" as={Link} to="/profile"><Icon
                icon={alignLeft} /> <span className="mt-1 ml-2">Profile</span></Dropdown.Item>
              :
              <Dropdown.Item eventKey="3" as={Link} to="/clientprofile"><Icon
                icon={alignLeft} /> <span className="mt-1 ml-2">Profile</span></Dropdown.Item>
            }
            <Dropdown.Item eventKey="4" as={Link} to="/settings"><Icon
              icon={cog} /> <span className="mt-1 ml-2">Account Settings</span></Dropdown.Item>
            <Dropdown.Item eventKey="4" as={Link} to="/finance"><Icon
              icon={dollar} /> <span className="mt-1 ml-2">Earnings</span></Dropdown.Item>
            <Dropdown.Item eventKey="5" as={Link} to="/admindashboard"><span className="mt-1 ml-2">Admin Dashboard</span></Dropdown.Item>
            {/*   <span className="text-light mr-2"> 
           <Link className="dropdown-item" to="/admindashboard"></Link> 
         </span>*/}
            {/*<Dropdown.Item eventKey="6" as={Link} href="#!" onClick={()=>logout(()=>history.push('/'))}><Icon*/}
            <Dropdown.Item eventKey="6" as={Link} href="#!" onClick={()=>logout(()=>history.push('/login'))}><Icon
              icon={signOut} /> <span className="mt-1 ml-2">Logout</span></Dropdown.Item>
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
      <li className="nav-item">
        <NavLink className="nav-link" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="">About</NavLink>
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
      <li className="nav-item">
        <NavLink className="nav-link" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="">About</NavLink>
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
        <NavLink className="nav-link" to="">Report</NavLink>
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

  const adminLinksMain = (
    <React.Fragment>
      <li className="nav-item">
        <NavLink className="nav-link" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/adminDashboard">Dashboard</NavLink>
      </li>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light topbar static-top shadow-sm bg-dark-teal osahan-nav-top px-0">
        <div className="container">
          <Logo />
          {!loading && (
            <Fragment>{isAuthenticated ? (<><authLinksMain/> <authLinks/></>) : <><ul className="navbar-nav align-items-center ml-auto">{guestLinksMain()} {guestLinks()} </ul></> }</Fragment>
          )}
        </div>
      </nav>
      {/* <Navbar expand="lg" className="pl-md-5 navbar-bg-teal osahan-nav-mid px-0 border-top shadow-sm">
        <Navbar.Toggle data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" />
        <Navbar.Collapse id="navbarResponsive" className="pl-md-3">
          <Nav className="mr-auto ml-md-5 pl-md-5">
            {!loading && (
              <Fragment>{isAuthenticated ? (user.type === 'Admin' ? adminLinksMain : authLinksMain) : guestLinksMain}</Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar> */}
    </React.Fragment>
  );
};

NavbarMain.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavbarMain);
