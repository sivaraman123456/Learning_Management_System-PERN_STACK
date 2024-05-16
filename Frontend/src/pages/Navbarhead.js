import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Home/Home.css';
const Navbarhead = () => {
console.log("nav")
return (
  <Navbar color="white">
  <Container>
  <Navbar.Brand href="#home" style={{color:'orange'   ,fontSize:"30px",fontWeight:"bold"}}>LMS</Navbar.Brand>
  <Nav className="me-auto">
        <Nav.Link style={{color:'green',fontWeight:"bold",marginLeft:'100px'}}href="/">Home</Nav.Link>
        <Nav.Link style={{color:'green',fontWeight:"bold",marginLeft:'50px' }} href="">About</Nav.Link>
        <Nav.Link style={{color:'green',fontWeight:"bold",marginLeft:'50px' }} href="/register">Register</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  )}

export default Navbarhead






