import { useState } from 'react'
import AppRouting from './router/AppRouting';
import NavBar from './components/Navbar';

function App() {
  return (
    <>
      <NavBar />
      <AppRouting />
    </>
  )
}

export default App
