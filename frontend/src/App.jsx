import "./app.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Signout from "./pages/Auth/Signout";
import Profile from "./pages/Profile/Profile";
import NavBar from "./components/Navbar/NavBar";
import Event from "./pages/Event/Event";
import CreateEvent from "./pages/Event/CreateEvent";
import EditEvent from "./pages/Event/EditEvent";
import CreateCategory from "./pages/category/CreateCategory";
import EditCategory from "./pages/category/EditCategory";
import CreateNote from './pages/Note/CreateNote'
import Note from "./pages/Note/Note"

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
        <Route path='/create/note/:eventId' element={<CreateNote />} />
        <Route path='/note/:noteId' element={<Note />} />
      </Routes>
    </>
  );
};

export default App;
