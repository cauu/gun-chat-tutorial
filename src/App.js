import React, { useCallback, useEffect, useState } from 'react';

import { user, db } from './core'

import Header from './components/Header';

import Chat from './components/Chat';

import './App.css';

function App() {
  const [username, setUsername] = useState('')

  useEffect(() => {
    // 初始化
    user
    .get('alias')
    .on(v => setUsername(v));

    // signed in
    db.on('auth', async (event) => {
      const alias = await user.get('alias');
      setUsername(alias)
    })
  }, [])

  const handleSignedOut = useCallback(() => {
    setUsername('')
    user.leave()
  }, [])

  return (
    <div>
      <Header username={username} onSignedOut={handleSignedOut} />

      <Chat username={username} />
    </div>
  );
}

export default App;
