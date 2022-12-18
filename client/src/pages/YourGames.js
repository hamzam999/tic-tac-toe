import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import Homepage from './Homepage';

const YourGames = () => {
  const navigate = useNavigate()
  const [loggedInUser, setLoggedInUser] = useState()

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

  // if(!user){
  //         return redirect("/login");
  // }
  return (
    <div className="your-games">
      <p>Hi! {loggedInUser}</p>
      <h4>Your Games</h4>
      <h1>No Games Found</h1>
      <div className="home-btn">
        <Link to={'/start-game'}>
          <button className="login-btn">Start New Game</button>
        </Link>
      </div>
    </div>
  )
}

export default YourGames
