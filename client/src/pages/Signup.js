import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
  })
  const [message, setMessage] = useState(null)
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserDetails({
      ...userDetails,
      [name]: value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      userDetails.name &&
      userDetails.userName &&
      userDetails.email &&
      userDetails.password
    ) {
      axios.post('http://localhost:8080/signup', userDetails).then(
        (res) => {
          console.log('response', res.data)
          setMessage(res.data.message)
          localStorage.setItem('userId', res.data.newUser._id)
          localStorage.setItem('userName', res.data.newUser.userName)
          localStorage.setItem('email', res.data.newUser.email)
        },
        (error) => {
          console.log('error', error.response.data.error)
          setMessage(error.response.data.error)
        }
      )
    }
    console.log(userDetails)
  }

  return (
    <div className="signup">
      <p>Create account</p>
      <h1>
        Let's get to know <br></br>you better!
      </h1>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <label>Your Name</label>
          <br></br>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            placeholder="Type your name here"
            onChange={handleChange}
          ></input>
          <br></br>
          <label>Your Username</label>
          <br></br>
          <input
            type="text"
            name="userName"
            value={userDetails.userName}
            placeholder="Type your username here"
            onChange={handleChange}
          ></input>
          <br></br>
          <label>Email</label>
          <br></br>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            placeholder="Type your email here"
            onChange={handleChange}
          ></input>
          <br></br>
          <label>Password</label>
          <br></br>
          <input
            type="password"
            name="password"
            value={userDetails.password}
            placeholder="Type your password here"
            onChange={handleChange}
          ></input>
          <br></br>
          <button className="signup-btn" type="submit">
            Register
          </button>
        </form>
      </div>
      <br></br>
      <div className="message">{message}</div>
    </div>
  )
}

export default Signup
