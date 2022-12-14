import React from 'react'

const Message = (props) => {
  const { message, sender } = props
  const messageClass = message.who === sender ? 'sent' : 'received';
  const avatar = `https://avatars.dicebear.com/api/initials/${message.who}.svg`;
  const ts = new Date(message.when);

  return (
    <div className={`message ${messageClass}`}>
      <img src={avatar} alt="avatar" />
      <div className="message-text">
        <p>{message.what}</p>

        <time>{ts.toLocaleTimeString()}</time>
      </div>
    </div>
  )
}

export default Message