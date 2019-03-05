import React from 'react'

const Notification = (props) => {

  const store = props.store

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    store.getState().notifications
      ? (
        (
          <div style={style}>
            {props.store.getState().notifications}
          </div>
        )
      )
      : null
  )


}

export default Notification
