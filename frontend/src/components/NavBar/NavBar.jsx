import { useState } from "react";
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { home_icon, signin_icon, user_icon } from "../../assets/icons";
import "./navbar.css"
const NavBar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    return isAuthenticated?(
        <nav className="navigation-bar">
            <NavLink to="/">
                {home_icon}
                <strong>Agenda</strong>
            </NavLink>

            <div className="dropdown">
                <button onClick={toggleMenu}>
                    {user_icon}
                </button>

                {showMenu && (
                    <div className="dropdown-content">
                        <NavLink to="/profile">
                            {user_icon} Profile
                        </NavLink>
                        <NavLink to="/signout">
                            {signin_icon} Sign Out
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    ):null
}

export default NavBar