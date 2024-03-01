
import './App.css'
import Login from './pages/Login'
import {Route, Routes} from 'react-router-dom'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
