import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { notificationNew } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { logout } from '../reducers/loginReducer'

const Menu = (props) => {

  const padding = {
    paddingRight: 5
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.clear()
    props.logout()
    blogService.setToken('')
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {props.login.name
                ? <em>{props.login.name} logged in <button onClick={handleLogout} className='handleLogout'>Log out</button></em>
                : <Link to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = {
  notificationNew, logout
}

const ConnectedMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default ConnectedMenu