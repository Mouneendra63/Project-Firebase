import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route,Router,Routes,NavLink} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import HomePage from './components/Homepage'
import Listing from './components/Listing'
import All from "./components/Home/allListings"
import Detail from './components/Detail'
const App = () => {
  return (
  <div>
    <HomePage/>
  <Routes>
    <Route path="/" element={<All/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/login" element={<Login/>}/>
    <Route path="/addlisting" element={<Listing/>} />
    <Route path="/book/view/:bookId" element={<Detail/>} />
  </Routes>
  </div>
  )
}

export default App