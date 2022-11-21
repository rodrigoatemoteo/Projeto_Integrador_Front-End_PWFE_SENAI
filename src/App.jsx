import { useState } from 'react'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage/Home';
import AppRoutes from './AppRoutes';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <AppRoutes />
    </div>
  )
}

export default App
