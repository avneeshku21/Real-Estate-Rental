
import React from 'react'
import {BrowserRouter ,Routes,Route} from "react-router-dom"
import './App.css'
import About from './pages/About'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {


  return (
    <>
     <BrowserRouter>
     <Header/>
     <Routes>
      <Route path='/' element = {<Home/>}></Route>
      <Route path='/about' element = {<About/>}></Route>
      <Route path='/signin' element = {<Signin/>}></Route>
      <Route path='/signup' element = {<Signup/>}></Route>
      <Route path='/profile' element = {<Profile/>}></Route>
     </Routes>
     </BrowserRouter>
<Footer/>
     
    </>
  )
}

export default App
