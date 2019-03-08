import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import {
  BrowserRouter as Link
} from 'react-router-dom'
import { notificationNew } from '../reducers/notificationReducer'

const UserList = (props) => {

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {props.visibleUsers.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>
                  <span>{user.name}</span>
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const usersToShow = ({ users }) => {
  return users.sort((a, b) => b.likes - a.likes)
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