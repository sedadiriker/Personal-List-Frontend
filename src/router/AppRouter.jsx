import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from '../pages/Home'
import PersonalAdd from '../pages/PersonalAdd'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/personal-add" element={<PersonalAdd/>}/>
      </Routes>
    </Router>
  )
}

export default AppRouter
