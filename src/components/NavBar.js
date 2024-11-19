import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/images/mlogo2.png';
import navIcon1 from '../assets/images/nav-icon1.svg';
import navIcon2 from '../assets/images/nav-icon2.svg';
import navIcon3 from '../assets/images/nav-icon3.svg';
import navIcon4 from '../assets/images/Google_Scholar_logo.svg.png';
import navIcon5 from '../assets/images/github.png';
import { Link } from 'react-router-dom';

export const NavBar = () => {

    const [activeLink, setActiveLink] = useState('home');
    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }

    return (
        <Navbar expand="md" className="navbar">
            <Container>
                <Navbar.Brand href="/website">
                    <img src={logo} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggler-icon bg-gradient-light"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
                        <Nav.Link as={Link} to="/nnbounding" className={activeLink === 'nnbounding' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('nnbounding')}>NNBounding</Nav.Link>
                    </Nav>
                    <span className="navbar-text">
              <div className="social-icon">
                <a href="https://www.linkedin.com/in/richardb11/" target="_blank"><img src={navIcon1} alt=""/></a>
                  <a href="https://github.com/richardborowski" target="_blank"><img src={navIcon5} alt=""/></a>
                <a href="https://scholar.google.com/citations?user=oCqepbQAAAAJ&hl=en" target="_blank"><img src={navIcon4} alt=""/></a>

              </div>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}