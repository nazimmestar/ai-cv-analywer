import React from 'react'
import {Link, useNavigate} from "react-router";
import {usePuterStore} from "~/lib/puter";

const Navbar = () => {
    const {auth} = usePuterStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut();
        navigate("/auth");
    };

    return (
        <nav className ="navbar">
           <Link to="/">
               <p className="text-2xl font-bold text-gradient">RESUMIND</p>
           </Link>
           <div className="flex items-center gap-4">
               <Link to="/upload">
                   <p className="primary-button w-fit">Upload Resume</p>
               </Link>
               {auth.isAuthenticated && (
                   <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-all">
                       Logout
                   </button>
               )}
           </div>
        </nav>
    )
}
export default Navbar
