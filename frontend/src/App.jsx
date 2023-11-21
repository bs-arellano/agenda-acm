import Home from './pages/Home/Home'

import { Routes, Route } from 'react-router-dom'
import Signin from './pages/Auth/Signin'
import Signup from './pages/Auth/Signup'
import Signout from './pages/Auth/Signout'
import Profile from './pages/Profile/Profile'
import NavBar from './components/Navbar/NavBar'

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signout' element={<Signout />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
