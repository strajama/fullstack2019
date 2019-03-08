import React from 'react'
import { notificationNew } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { logout } from '../reducers/loginReducer'

const UserForm = (props) => {

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.clear()
    props.logout()
    blogService.setToken('')
  }

  return (
    <div>
      {props.login.name} logged in
      <button onClick={handleLogout} className='handleLogout'>Log out</button>
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

const ConnectedUserForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm)

export default ConnectedUserForm