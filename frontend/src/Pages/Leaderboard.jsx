import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CiUser } from "react-icons/ci";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/userContext';
import Header from '../components/Header';
import LoadingAnimation from '../components/LoadingAnimation ';

const Leaderboard = () => {
    const {users, loading, setUsers, setLoading, fetchUsers} = useContext(UserContext);
    const [historys, setHistorys] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // State for selected user to open modal


    useEffect(() => {
        // setLoading(true);
        fetchUsers();
    }, []);

    // Fetch claimed history of a user and show it in the modal
    const claimedHistory = async (username) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/v1/your-history`, { username });
            // console.log(response);
            if (response.data.success) {
                setHistorys(response.data.data.slice(0, 5)); // Display only the latest 5 entries
                setSelectedUser(username); // Open modal with selected user's history
            }
        } catch (err) {
            console.log("Error in history:", err);
        }
    };

    const closeModal = () => {
        setSelectedUser(null); // Close modal by resetting selected user
    };

    if (loading) return <div><LoadingAnimation/></div>;

    return (
        <div className='h-fit bg-slate-100'>
            <Header/>
            <div className=''>
                {/* Users Leaderboard */}
                <ul>
                    {users.map((user, index) => (
                        <li
                            key={user._id}
                            onClick={() => claimedHistory(user.username)}
                            className="cursor-pointer p-4 border-b mx-5 border-gray-300 hover:bg-gray-300 rounded"
                        >
                            <div className="flex text-center">
                                <div className="w-1/3 flex items-center space-x-2 md:space-x-3">
                                    <CiUser />
                                    <div>
                                        <div className='flex'>{user.username}</div>
                                        <div className='flex'>Rank : {index + 1}</div>
                                    </div>
                                </div>
                                <div className="w-1/3 text-orange-500">
                                    Prize: ₹{user.Points}
                                </div>
                                <div className="w-1/3 flex justify-end text-green-400">
                                    {user.Points}
                                </div>
                            </div>
                        </li>
                    ))}
                    <ToastContainer />
                </ul>

                {/* Modal for showing user history */}
                {selectedUser && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-lg font-bold mb-4">{selectedUser}'s History</h2>
                            <ul>
                                {historys.map((history, index) => (
                                    <li key={index} className="border-b py-2">
                                        <div>Date: {new Date(history.date).toLocaleDateString()}</div>
                                        <div>Points Awarded: {history.pointsAwarded}</div>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={closeModal}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
