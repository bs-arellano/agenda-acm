import "./app.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Signin from "./pages/Auth/Signin.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import Signout from "./pages/Auth/Signout.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Event from "./pages/Event/Event.jsx";
import CreateEvent from "./pages/Event/CreateEvent.jsx";
import EditEvent from "./pages/Event/EditEvent";
import CreateCategory from "./pages/category/CreateCategory.jsx";
import EditCategory from "./pages/category/EditCategory.jsx";
import CreateNote from './pages/Note/CreateNote.jsx'
import Note from "./pages/Note/Note.jsx"

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signout" element={<Signout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/event/:eventId" element={<Event />} />
        <Route path="/create/event" element={<CreateEvent />} />
        <Route path="/create/category" element={<CreateCategory />} />
        <Route path="/edit/categories/:userId" element={<EditCategory />} />
        <Route path="/edit/event/:eventId" element={<EditEvent />} />
        <Route path="/create/category" element={<CreateCategory />} />
        <Route path="/edit/categories/:userId" element={<EditCategory />} />
        <Route path='/create/note/:eventId' element={<CreateNote />} />
        <Route path='/note/:noteId' element={<Note />} />
      </Routes>
    </>
  );
};

export default App;
