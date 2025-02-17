import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route,Router,Routes} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import HomePage from './components/Homepage'
const App = () => {
  return (<Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/login" element={<Login/>}/>
  </Routes>
  )
}

export default App