import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [loginDetails, setloginDetails] = useState({
    userName: '',
    password: '',
  })
  const [message, setMessage] = useState(null)

  useEffect(() => {
    // setUserId()
    if (localStorage.getItem('userId')) {
      navigate('/your-game')
    }
    // console.log(localStorage.getItem('userId'))
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target
    setloginDetails({
      ...loginDetails,
      [name]: value,
    })
  }
  const handleLogin = (e) => {
    e.preventDefault()

    if (loginDetails.userName && loginDetails.password) {
      axios.post('http://localhost:8080/login', loginDetails).then(
        (res) => {
          console.log('response', res.status)
          setMessage(res.data.message)
          window.localStorage.setItem('userId', res.data.existingUser._id)
          window.localStorage.setItem(
            'userName',
            res.data.existingUser.userName
          )
          window.localStorage.setItem('email', res.data.existingUser.email)
          navigate('/your-game')
        },
        (error) => {
          console.log('error', error)
          setMessage(error.response.data.error)
        }
      )
    }
  }

  return (
    <div className="login">
      <p>Login</p>
      <h1>
        Please enter your<br></br>details
      </h1>
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <label>Your Username</label>
          <br></br>
          <input
            type="text"
            name="userName"
            value={loginDetails.userName}
            placeholder="Type your username here"
            onChange={handleChange}
          ></input>
          <br></br>

          <label>Password</label>
          <br></br>
          <input
            type="password"
            name="password"
            value={loginDetails.password}
            placeholder="Type your password here"
            onChange={handleChange}
          ></input>
          <br></br>
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
      <br></br>
      <div className="message">{message}</div>
    </div>
  )
}

export default Login
