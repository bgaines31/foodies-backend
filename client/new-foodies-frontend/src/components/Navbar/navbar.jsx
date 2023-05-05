import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "./Navbar.css";

function Navigation() {
  return (
    <Navbar>
     <div className="app__navbar-logo">
        {/* <img src={} alt="foodies logo for navbar" style ={{height:"85px", weight:"85px"}}></img> */}
     </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="app__navbar"
            navbarScroll
          >
            <div>Logo</div>
            <div className=' app__navbar-links'>
            <ul className="navbar-nav">
            <li className="nav-item">
              <Nav.Link href="/">Home</Nav.Link>
              </li>
              <li className="nav-item">
              <Nav.Link href="/">About</Nav.Link>
              </li>
              <li className="nav-item">
              <Nav.Link href="/myRecipes">My Recipes</Nav.Link>
              </li>
              <li className="nav-item">
              <Nav.Link href="/otherRecipes">
                Get Inspiration
              </Nav.Link>
              </li>
              </ul>
            </div>
            <div className='app__navbar-login'>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export { Navigation };
