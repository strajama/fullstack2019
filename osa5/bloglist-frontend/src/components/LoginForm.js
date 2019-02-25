import React from 'react'
import  { useField } from '../hooks'

const LoginForm = ({ login }) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async event => {
    event.preventDefault()
    const loggingin = await login ({
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

export default LoginForm