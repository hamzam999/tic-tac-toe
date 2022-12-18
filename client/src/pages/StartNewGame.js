import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function StartNewGame() {
  const navigate = useNavigate()
  const [loggedInUser, setLoggedInUser] = useState()
  const [userEmail, setEmail] = useState({
    email: '',
  })
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      const foundUser = localStorage.getItem('userName')
      setLoggedInUser(foundUser)
      console.log(foundUser)
    } else {
      console.log('esle')
      // return <Navigate to="/login" />
      navigate('/login')
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmail({
      ...userEmail,
      [name]: value,
    })
  }

  const startGame = async () => {
    if (userEmail.email) {
      await axios.post('http://localhost:8080/start-game', userEmail).then(
        (res) => {
          console.log('response', res.data)
          //   localStorage.setItem('res_id',res.data._id)
          //   const data=localStorage.getItem('res_id')
          setMessage(res.data)
          //   console.log('cleint', client)
          navigate('/your-game')
        },
        (error) => {
          console.log('error', error.response.data)
          // setLoggedIn(false)
          setMessage(error.response.data)
        }
      )
    }
  }

  return (
    <div className="new-game">
      <h5>Start a new game {loggedInUser}</h5>
      <h2>Whom do you want to play with ?</h2>
      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="Type their email here"
        value={userEmail.email}
        onChange={handleChange}
      ></input>
      <button className="yellow-button" onClick={startGame}>
        Start game
      </button>
      <br></br>
      <div className="message">!{message}</div>
    </div>
  )
}

export default StartNewGame
