import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className="homepage">
      <p>async</p>
      <h1>tic tac toe</h1>
      <div className="home-btn">
        <Link to={'/login'}>
          <button className="login-btn">Login</button>
        </Link>
        <Link to={'/signup'}>
          <button className="signup-btn">Register</button>
        </Link>
      </div>
    </div>
  )
}

export default Homepage
