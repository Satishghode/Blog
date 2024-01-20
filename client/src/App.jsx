import React from 'react'
import { BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'

function App() {
  return (
    <BrowserRouter >
       <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/project' element={<Project />} />
       </Routes>
    </BrowserRouter>

    )
}

export default App
