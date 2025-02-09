import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Checkout from './components/Checkout'

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <Main />
        <Footer />
        <Cart />
        <Checkout />
      </>
    </Router>
  )
}

export default App