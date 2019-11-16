import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export default class ToolBar extends Component {

    
   
    render() {
    
        const loginRegLink = (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/Main" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Home" className="nav-link">
                Register
              </Link>
            </li>
          </ul>
        )
    
        const userLink = (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/miniProfile" className="nav-link">
                User
              </Link>
            </li>
          </ul>
        )
    
        return (
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
              <Link to="/" className="nav-link">
                <h2>DoggoWorld</h2>
                  </Link>
    
    
            </Navbar.Brand>
           
          </Navbar>
        )
      }
    
}