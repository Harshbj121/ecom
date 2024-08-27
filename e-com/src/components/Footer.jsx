// import React from 'react'

import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in 
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');// Remove token from localStorage
        localStorage.removeItem('user');// Remove user from localStorage 
        navigate('/login') // Redirect to login page after logout
    }
    return (
        <div className="footer-parent" >
            <div className="footer-child">
                <div >
                    <ol className="footer-ol">
                        <li><h1><Link className="footer-a" to="/womenproducts" >Women</Link></h1></li>
                    </ol>
                </div>
                <div >
                    <ol className="footer-ol">
                        <li><h1><Link className="footer-a" to="/menproducts">Men</Link></h1></li>
                    </ol>
                </div>
                <div >
                    <ol className="footer-ol">
                        <li><h1><Link className="footer-a" to="/kidproducts">Kid</Link></h1></li>
                    </ol>
                </div>
                <div >
                    <ol className="footer-ol">
                        <li><h1>Links</h1></li>
                        <li><Link className="footer-a" to="/">Home</Link></li>
                        {isLoggedIn ? (
                            <Link className="footer-a" onClick={logout}>Logout</Link>
                        ) : (
                            <Link to="/login" className="footer-a">Login</Link>
                        )
                        }
                        <li><Link className="footer-a" to="/contact">Contact</Link></li>
                    </ol>
                </div>
            </div>
            <hr style={{ backgroundColor: "white" }} />
            <div className="text-center">Copyright &#169; Ecommerce 2023-2024</div>
        </div>
    )
}

export default Footer