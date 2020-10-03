import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/schedule">Schedule</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/log">Log</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/Crops">Crops</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/Chart">Chart</Link>
            </li>
            <li className="navbar__item">
                <Link onClick={() => localStorage.removeItem("seedPlan_user")} className="navbar__link" to="/login">Logout</Link>
            </li>
        </ul>
    )
}