import React, { useState } from 'react';

import { user } from '../../core'

 
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin  = () => {
    user.auth(username, password, ({ err }) => err && alert(err));
  }

  const handleSignup = () => {
    user.create(username, password, ({ err }) => {
      if (err) {
        alert(err);
      } else {
        handleLogin();
      }
    });
   }

  return (
    <>
      <label for="username">Username</label>
      <input name="username" value={username} minlength="3" maxlength="16" onInput={(e) => setUsername(e.target.value)} />

      <label for="password">Password</label>
      <input name="password" value={password} type="password" onInput={(e) => setPassword(e.target.value)} />

      <button class="login" onClick={handleLogin}>Login</button>
      <button class="login"  onClick={handleSignup}>Sign Up</button>
    </>
  )
}

export default Login