import React from 'react'
import Nav from "react-bootstrap/Nav"
import NavBar from "react-bootstrap/NavBar"
import logo from '../imgs/logo.png'

/*
add auth checker to change login to logout service and remove register
*/

export default function NavigationBar() {
  return (
    <div>
        <NavBar bg="dark" variant="dark" className="ps-3 pe-3" >
            <NavBar.Brand href="/">
                <img
                    alt=""
                    src={logo}
                    width="50"
                    height="50"
                    className="d-inline-block align-center"
                />{"  "}
                Challenger
            </NavBar.Brand>
            <Nav className="ms-auto">
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
        </NavBar>
    </div>
  )
}
