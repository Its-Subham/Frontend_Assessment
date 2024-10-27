import React from 'react'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CiUser } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/userContext';
import Header from '../components/Header';
import LoadingAnimation from '../components/LoadingAnimation ';

const Home = () => {

    const { users, loading, setUsers, setLoading, fetchUsers } = useContext(UserContext);

    // Call the fetchUsers function when the component loads
    useEffect(() => {
        // Initial call to start the interval immediately
        sendHealthCheck();
        // setLoading(true);
        fetchUsers();
    }, []);
    // console.log(users)

    // Claim points for the selected user
    const claimPoints = async (username) => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/v1/claim-points`, { username });
            console.log(response);
            if (response.data.success) {
                console.log(response.data.data.username)
                toast.success((`Points claimed successfully for ${response.data.data.username}`), {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                fetchUsers(); // Update leaderboard after claiming points
            }
        } catch (error) {
            console.error("Error claiming points:", error);
        }
    };

    function sendHealthCheck() {
        axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/health`)
            .then(response => {
                console.log('Health Check Response:', response.data);
            })
            .catch(error => {
                console.error('Error in Health Check:', error.message);
            });
    }

    // Send request every 3 minutes (180,000 milliseconds)
    setInterval(sendHealthCheck, 300000);


    if (loading) return <div><LoadingAnimation /></div>;

    // Slice top three user 
    const topThreeUsers = users.slice(0, 3);

    return (
        <div className='h-fit bg-slate-100'>
            <Header />
            <div className=''>
                {/* Users leaderboard */}
                <ul>
                    {users.map((user, index) => (
                        <li
                            key={user._id}
                            onClick={() => claimPoints(user.username)}
                            className="cursor-pointer p-4 border-b mx-5  border-gray-300 hover:bg-gray-300 rounded"
                        >
                            <div className="flex text-center">
                                <div className="w-1/3 flex items-center space-x-2 md:space-x-3">
                                    <CiUser />

                                    <div>
                                        <div className='flex'>
                                            <span>{user.username}</span>
                                        </div>
                                        <div>
                                            <span className='flex'>Rank : {index + 1}</span>
                                        </div>
                                    </div>

                                </div>

                                <div className="w-1/3 text-orange-500">
                                    <span className="">Prize:</span> ₹{user.Points}
                                </div>
                                <div className="w-1/3 flex justify-end text-green-400">
                                    {user.Points}
                                </div>
                            </div>
                        </li>
                    ))}
                    <ToastContainer />
                </ul>
            </div>
        </div>
    );
}

export default Home