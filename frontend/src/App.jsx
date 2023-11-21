import Home from './pages/Home/Home'

import { Routes, Route } from 'react-router-dom'
import Signin from './pages/Auth/Signin'
import Signup from './pages/Auth/Signup'
import Signout from './pages/Auth/Signout'
import Profile from './pages/Profile/Profile'
import NavBar from './components/Navbar/NavBar'
import Event from './pages/Event/Event'
import CreateEvent from './pages/Event/CreateEvent'
import EditEvent from './pages/Event/EditEvent'

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
        <Route path='/event/:eventId' element={<Event />} />
        <Route path='/create/event' element={<CreateEvent />} />
        <Route path='/edit/event/:eventId' element={<EditEvent />} />
      </Routes>
    </>
  )
}

export default App
