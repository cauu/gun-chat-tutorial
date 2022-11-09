import React,  { useEffect, useRef, useState } from 'react'
import GUN from 'gun';

import { db, user } from '../../core'

import Login from '../Login'

import ChatMessage from './Message'
import { useCallback } from 'react';

const Chat = (props) => {
  const { username } = props
  const messages = useRef([])
  const [_, forceUpdate] = useState({})
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = useCallback(async () => {
    // const secret = await window.SEA.encrypt(newMessage, '#foo');
    const message = user.get('all').set({ what: newMessage });
    const index = new Date().toISOString();
    db.get('chat').get(index).put(message);
    setNewMessage('')
    // newMessage = '';
    // canAutoScroll = true;
    // autoScroll();
  }, [newMessage])

  useEffect(() => {
    var match = {
      // lexical queries are kind of like a limited RegEx or Glob.
      '.': {
        // property selector
        '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
      },
      '-': 1, // filter in reverse
    };

    db.get('chat')
      .map(match)
      .once(async (data, id) => {
        if (data) {
          const key = '#foo'
          // const what = (await window.SEA.decrypt(data.what, key)) + ''
          const what = (data.what) + ''
          console.log('what', what)
          const message = {
            // transform the data
            who: await db.user(data).get('alias'), // a user might lie who they are! So let the user system detect whose data it is.
            what, // force decrypt as text.
            when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
          };
          if (message.what) {
            messages.current = [...messages.current.slice(-100), message].sort((m1, m2) => m1.when - m2.when)
            forceUpdate({})
            // if (canAutoScroll) {
            //   autoScroll();
            // } else {
            //   unreadMessages = true;
            // }
          }
        }
      })
  }, [])

  if (username) {
    return (
      <div>
        <main>
          {
            messages.current.map((msg) => {
              return (
                <ChatMessage message={msg} sender={username} />
              )
            })
          }
        </main>

        <div className="form">
          <input type="text" placeholder="Type a message..." value={newMessage} maxlength="100" onChange={(e) => setNewMessage(e.target.value)} />

          <button disabled={!newMessage} onClick={handleSendMessage}>💥</button>
        </div>
      </div>
    )
  }

  return (
    <Login />
  )
}

export default Chat