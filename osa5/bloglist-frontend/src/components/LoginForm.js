import React, { useState } from 'react'

const LoginForm = ({login}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    const loggingin = await login ({
      username, password
    })
    if (loggingin) {
      setUsername('')
      setPassword('')
    }
  }

    return (
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">kirjaudu</button>
      </form> 
    )
   
    
  
}

export default LoginForm