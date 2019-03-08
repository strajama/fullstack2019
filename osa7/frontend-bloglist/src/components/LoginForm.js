import React from 'react'
import  { useField } from '../hooks'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { notificationNew } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { newUser } from '../reducers/loginReducer'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const loginNow = async logUser => {
    try {
      const user = await loginService.login(logUser)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      props.newUser(user)
      return true
    } catch (error) {
      props.notificationNew('wrong username or password', 5)
      return false
    }
  }

  const handleLogin = async event => {
    event.preventDefault()
    const loggingin = await loginNow ({
      username: username.value , password: password.value
    })
    if (loggingin) {
      username.reset()
      password.reset()
    }
  }

  return (
    <form onSubmit={handleLogin} className='loginForm'>
      <div>
          username
        <input {...username.print()}
          name="Username"
        />
      </div>
      <div>
          password
        <input {...password.print()}
          name="Password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  notificationNew, newUser
}

const ConnectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default ConnectedLoginForm
