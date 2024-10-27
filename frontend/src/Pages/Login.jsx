import React, { useState, useContext, useEffect } from 'react';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import LoadingAnimation from '../components/LoadingAnimation ';
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { username, password, loading, setuserName, setPassword, userLogin, setLoading } = useContext(UserContext);
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        setLoading(false);
    }, [])

    const visibilityHandler = () => {
        setShowPassword(!showPassword);
    };

    const handleSignUp = () => {
        navigate('/registration'); // Redirect to the /registration page
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-100 p-4">
            <div className="flex flex-col w-full max-w-5xl shadow-lg rounded-lg overflow-hidden md:flex-row">
                {/* Left Section - Sign Up */}
                <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 md:p-12 flex flex-col justify-center items-center">
                    <h2 className="text-2xl md:text-3xl mb-4 font-bold">New here?</h2>
                    <button
                        onClick={handleSignUp} // Call handleSignUp on click
                        className="bg-transparent border border-white text-white py-2 px-6 rounded-full hover:bg-white hover:text-blue-600 transition"
                    >
                        SIGN UP
                    </button>
                </div>

                {/* Right Section - Sign In */}
                <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">Sign In</h2>
                    <form method='post' onSubmit={userLogin}>
                        <label className="text-sm font-semibold">Username</label>
                        <input
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setuserName(e.target.value)}
                            required
                            className="w-full mb-4 p-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label className="text-sm font-semibold">Password</label>
                        <div className='relative w-full mb-6'>
                            <input
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

                        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition" type='submit'>Login</button>
                        {loading && <LoadingAnimation />}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
