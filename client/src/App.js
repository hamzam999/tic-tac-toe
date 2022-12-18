import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import './App.css'
import Login from './pages/Login'
import YourGames from './pages/YourGames'
import StartNewGame from './pages/StartNewGame'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/your-game" element={<YourGames />}></Route>
          <Route path="/start-game" element={<StartNewGame />}></Route>


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
