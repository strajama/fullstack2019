import React from 'react'
import  { useField } from '../hooks'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { notificationNew } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { newUser } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const loginNow = async logUser => {
    try {
      const user = await loginService.login(logUser)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      await blogService.setToken(user.token)
      await props.newUser(user)
      return true
    } catch (error) {
      await props.notificationNew('wrong username or password', 5)
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
    <Form onSubmit={handleLogin} className='loginForm'>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <input {...username.print()}
          name="Username"
        />
        <Form.Label>password</Form.Label>
        <input {...password.print()}
          name="Password"
        />
        <Button variant="primary" type="submit">login</Button>
      </Form.Group>

    </Form>
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
