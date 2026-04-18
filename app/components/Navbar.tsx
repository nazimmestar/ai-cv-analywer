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
               <p className="text-2xl max-sm:text-lg font-bold text-gradient">ResumeIQ</p>
           </Link>
           <div className="flex items-center gap-2 max-sm:gap-1">
               <Link to="/upload">
                   <p className="primary-button w-fit px-3 py-1 max-sm:px-2 max-sm:py-1 max-sm:text-sm">Upload Resume</p>
               </Link>
               {auth.isAuthenticated && (
                   <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 max-sm:px-3 max-sm:py-1 max-sm:text-sm rounded-full font-semibold transition-all">
                       Logout
                   </button>
               )}
           </div>
        </nav>
    )
}
export default Navbar
