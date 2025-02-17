import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route,Router,Routes} from 'react-router-dom'
const App = () => {
  return (<Routes>
    <Route path="/" element={<h1>Home</h1>} />
    <Route path="/login" element={<h1>login</h1>} />
  </Routes>
  )
}

export default App