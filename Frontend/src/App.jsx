import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import { Toaster } from './components/ui/toaster'
import ChatContextProvider from './context/userContext'
const App = () => {
  return (
    <Router>
        <ChatContextProvider>
        <div className='min-h-screen text-maintext bg-secondary font-mono'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/chat' element={<Chat />} />
          </Routes>
        </div>
        <Toaster />
      </ChatContextProvider>
    </Router>
  )
}

export default App
