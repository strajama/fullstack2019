import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    //color: props.notifications.colorType === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    props.notifications
      ? (
        (
          <div style={style}>
            {props.notifications}
          </div>
        )
      )
      : null
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification