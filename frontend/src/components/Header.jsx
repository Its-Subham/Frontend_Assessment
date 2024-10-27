import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import Navbar from './Navbar';

const Header = () => {
    const { users } = useContext(UserContext);
    const [selectedHistory, setSelectedHistory] = useState(null); // For storing the selected history data
    const [activeButton, setActiveButton] = useState(null); // For keeping track of the active button

    const fetchHistory = async (type) => {
        let endpoint;
        switch (type) {
            case 'daily':
                endpoint = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/v1/your-daily-history`;
                break;
            case 'weekly':
                endpoint = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/v1/your-weekly-history`;
                break;
            case 'monthly':
                endpoint = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/v1/your-monthly-history`;
                break;
            default:
                return;
        }

        try {
            const response = await axios.get(endpoint);
            setSelectedHistory(response.data.data); // Set the history data to display in the modal
            setActiveButton(type); // Set the active button style
        } catch (err) {
            console.log(`Error while fetching ${type} history`, err);
        }
    };

    const closeModal = () => {
        setSelectedHistory(null); // Close the modal by resetting the history data
        setActiveButton(null); // Reset the button style
    };

    return (
        <div>
            <div className='bg-slate-300 rounded'>
            <Navbar />

                <div className="flex justify-center my-4 flex-wrap">
                    <button
                        onClick={() => fetchHistory('daily')}
                        className={`px-4 py-2 rounded-3xl mr-2  ${activeButton === 'daily' ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                    >
                        Daily
                    </button>
                    <button
                        onClick={() => fetchHistory('weekly')}
                        className={`px-4 py-2 rounded-3xl mr-2 ${activeButton === 'weekly' ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => fetchHistory('monthly')}
                        className={`px-4 py-2 rounded-3xl ${activeButton === 'monthly' ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                    >
                        Monthly
                    </button>
                </div>

                {/* Top Three Users */}
                <div className="flex justify-around p-4 ">
                    {users.slice(0, 3).map((user, index) => (
                        <div key={user._id} className="flex flex-col items-center w-1/4">
                            <span className='font-semibold'>{user.username}</span>
                            <span className="text-gray-700">{user.Points}</span>
                            <span className="text-orange-500">Prize: ₹{user.Points}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for displaying selected history */}
            {selectedHistory && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[70vh] overflow-hidden">
                        <h2 className="text-lg font-bold mb-4">
                            {activeButton.charAt(0).toUpperCase() + activeButton.slice(1)} History
                        </h2>
                        <div className="overflow-y-auto max-h-[50vh] pr-2">
                            <ul>
                                {selectedHistory.map((entry, index) => (
                                    <li key={index} className="border-b py-2">
                                        <div>User: {entry._id}</div>
                                        <div>Total Points Awarded: {entry.totalPoints || entry.totalPointsAwarded}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
    );
};

export default Header;
