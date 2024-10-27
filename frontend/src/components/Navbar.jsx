import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { username, isLoggedIn, setIsLoggedIn, setuserName } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [userDetailsData, setUserDetailsData] = useState(null);

    const userMenuRef = useRef(null); // Ref for the dropdown menu
    const usernameRef = useRef(null); // Ref for the username container

    // Handle user logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        setuserName('');
        setShowUserMenu(false);
        navigate('/');
    };

    // Fetch user details when userId changes or when the dropdown is opened
    useEffect(() => {
        const userDetails = async () => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/v1/get-users-info-byusername`,
                    { username }
                );
                if (response.data) {
                    setUserDetailsData(response.data);
                }
            } catch (error) {
                console.log("Error while fetching user details", error);
            }
        };

        if (showUserMenu) {
            userDetails();
        }
    }, [showUserMenu, username]);

    // Close the dropdown when clicking outside of the username or dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target) &&
                usernameRef.current &&
                !usernameRef.current.contains(event.target)
            ) {
                setShowUserMenu(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Check the current path and set active button
    const isActive = (path) => location.pathname === path;

    return (
        <div className="relative flex justify-between items-center bg-blue-600 p-4">
            {/* Left side - Menu icon for small screens */}
            <div className="md:hidden">
                {menuOpen ? (
                    <MdClose onClick={() => setMenuOpen(false)} className="text-white text-3xl cursor-pointer" />
                ) : (
                    <IoMdMenu onClick={() => setMenuOpen(true)} className="text-white text-3xl cursor-pointer" />
                )}
            </div>

            {/* Centered Links */}
            <div className={`flex-col space-y-4 md:space-y-0 md:space-x-4 md:flex-row md:w-3/4 md:flex md:justify-center md:items-center ${menuOpen ? "flex" : "hidden"} md:flex`}>
                <Link
                    to="/"
                    className={`text-white text-xl hover:text-gray-200 rounded-md w-full md:w-32 h-9 flex justify-center items-center ${isActive('/') ? 'bg-orange-400' : 'bg-slate-600'}`}
                >
                    Home
                </Link>
                <Link
                    to="/leaderboard"
                    className={`text-white text-xl hover:text-gray-200 rounded-md w-full md:w-32 h-9 flex justify-center items-center ${isActive('/leaderboard') ? 'bg-orange-400' : 'bg-slate-600'}`}
                >
                    Leaderboard
                </Link>
            </div>

            {/* Right Aligned User Info and Login/Register */}
            <div className="space-x-4 relative">
                {isLoggedIn ? (
                    <div
                        ref={usernameRef} // Ref for the username container
                        onClick={() => setShowUserMenu((prev) => !prev)} // Toggle user menu
                        className="text-white text-xl font-semibold cursor-pointer flex items-center justify-center "
                    >
                        <div className='bg-orange-400 h-10 w-10 rounded-full flex items-center justify-center text-2xl leading-none'>
                            <span className='mb-[5px]'>{username[0]}</span>
                        </div>
                        <span className='mb-[5px]'>{username}</span>
                        <MdOutlineArrowDropDown
                            className={`mb-[2px] text-[28px] transition-transform duration-300 ${showUserMenu ? '-rotate-180' : ''}`}
                        />
                    </div>
                ) : (
                    <div className='space-x-4 flex justify-center'>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-white text-blue-600 w-24 h-10 px-4 py-2 rounded hover:bg-gray-100 transition mb-2"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/registration')}
                            className="bg-white text-blue-600 w-24 h-10 px-4 py-2 rounded hover:bg-gray-100 transition hidden md:block"
                        >
                            Sign Up
                        </button>
                    </div>
                )}

                {/* User Details Dropdown */}
                {showUserMenu && userDetailsData && (
                    <div ref={userMenuRef} className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
                        <div className="text-gray-700 mb-2">
                            <strong>First Name:</strong> {userDetailsData.data.firstName}
                        </div>
                        <div className="text-gray-700 mb-2">
                            <strong>Email:</strong> {userDetailsData.data.email}
                        </div>
                        <div className="text-gray-700 mb-4">
                            <strong>Points:</strong> {userDetailsData.data.Points}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
