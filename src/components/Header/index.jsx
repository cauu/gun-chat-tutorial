import React from 'react'


const Header = (props) => {
  const { username, onSignedOut } = props

  return (
    <header>
      <h1>🔫💬</h1>
      {
        username &&
        <>
          <div className="user-bio">
            <span>Hello <strong>{username}</strong></span>
            <img src={`https://avatars.dicebear.com/api/initials/${username}.svg`} alt="avatar" /> 
          </div>
    
          <button className="signout-button" onClick={onSignedOut}>Sign Out</button>
        </>
      }
    </header>
  )
}

export default Header