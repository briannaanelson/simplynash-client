import React from "react";
import { Link, useHistory } from "react-router-dom";

export const NavBar = () => {
    const history = useHistory()
    return (
        <ul className="navbar">
            <li className="navbar_item">
                <Link className="navbar_link" to="/"> Home </Link>
            </li>
            <li className="navbar_item">
                <Link className="navbar_link" to="/breakfast">Breakfast</Link>
            </li>
            <li className="navbar_item">
                <Link className="navbar_link" to="/brunch">Brunch</Link>
            </li>
            <li className="navbar_item">
                <Link className="navbar_link" to="lunch">Lunch</Link>
            </li>
            <li className="navbar_item">
                <Link className="navbar_link" to="dinner">Dinner</Link>
            </li>
            <li className="navbar_item">
                <Link className="navbar_link" to="quickbites"> QuickBites </Link>
            </li>
            {
                (localStorage.getItem("lu_token") !== null ) ?
                <li className="nav-item">
                    <button className="nav-link"
                        onClick={() => {
                            localStorage.removeItem("lu_token")
                            history.push({ pathname: "/" })
                        }}
                        >Logout</button>
                </li> :
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
            </>
        }        </ul>
    )
}