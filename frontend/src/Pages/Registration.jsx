import React, { useState, useContext, useEffect } from 'react';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import LoadingAnimation from '../components/LoadingAnimation ';

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { firstName, lastName, email, username, password, loading, setfirstName, setlastName, setEmail, setuserName, setPassword, userRegistration, setLoading } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleSignIn = () => {
        navigate('/login'); // Redirect to the login page
    };

    const visibilityHandler = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-100 p-4">
            <div className="flex flex-col w-full max-w-5xl shadow-lg rounded-lg overflow-hidden md:flex-row">
                {/* Left Section - Sign Up */}
                <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 md:p-12 flex flex-col justify-center items-center">
                    <h2 className="text-2xl md:text-3xl mb-4 font-bold">One of us?</h2>
                    <button
                        onClick={handleSignIn} // Call handleSignIn on click
                        className="bg-transparent border border-white text-white py-2 px-6 rounded-full hover:bg-white hover:text-blue-600 transition"
                    >
                        SIGN IN
                    </button>
                </div>

                {/* Right Section - Sign Up */}
                <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">Sign Up</h2>
                    <form onSubmit={userRegistration}>
                        <label className="text-sm font-semibold" htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            placeholder="First Name"
                            onChange={(e) => { setfirstName(e.target.value); }}
                            required
                            className="w-full mb-4 p-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="text-sm font-semibold" htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            placeholder="Last Name"
                            onChange={(e) => { setlastName(e.target.value); }}
                            required
                            className="w-full mb-4 p-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="text-sm font-semibold" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => { setEmail(e.target.value) }}
                            required
                            className="w-full mb-4 p-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="text-sm font-semibold" htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => { setuserName(e.target.value); }}
                            required
                            className="w-full mb-4 p-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label className="text-sm font-semibold" htmlFor="password">Password</label>
                        <div className='relative w-full mb-6'>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='*****'
                                required
                                className="w-full p-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type='button'
                                onClick={visibilityHandler}
                                className='absolute right-4 top-1/2 transform -translate-y-1/2'
                            >
                                {showPassword ? <IoEye className="text-xl" /> : <IoMdEyeOff className="text-xl" />}
                            </button>
                        </div>

                        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition" type='submit'>Sign Up</button>
                        {loading && <LoadingAnimation />}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;
