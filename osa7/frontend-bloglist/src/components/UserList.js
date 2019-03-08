import React from 'react'
import { notificationNew } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import User from './User'

const UserList = (props) => {

  return (
    <div>
      <h2>Users</h2>
      {props.visibleUsers.map(user =>
        <User key={user.id} user={user} />
      )}
    </div>
  )
}

const usersToShow = ({ users }) => {
  console.log('usersToshow', users)
  return users //blogs.sort((a, b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    visibleUsers: usersToShow(state)
  }
}

const mapDispatchToProps = {
  notificationNew
}

const ConnectedUserList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)

export default ConnectedUserList