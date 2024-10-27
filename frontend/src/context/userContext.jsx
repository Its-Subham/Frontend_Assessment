import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const userRegistration = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!firstName || !lastName || !email || !username || !password) {
            return console.log("Please fill in all required fields.");
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/v1/register`, {
                firstName,
                lastName,
                email,
                username,
                password
            });
            console.log("Registration successful:", response.data); // Log the response
            setLoading(true);
            setTimeout(() => {
                setfirstName('');
                setlastName('');
                setEmail('');
                setPassword('');
                navigate('/'); // Use navigate instead of window.location.href
                setIsLoggedIn(true);
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.log(error.response ? error.response.data : error.message); // More detailed error
        }
    };

    const userLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/v1/login`, {
                username,
                password
            });
            console.log("Login successful:", response.data);
            // console.log(response.data.data._id)
            const newToken = response.data.token; // Adjust based on your API response
            setToken(newToken); // Store the token in state
            localStorage.setItem('token', newToken); // Store the token in localStorage
            console.log("Token stored:", newToken);

            setLoading(true);  // Start loading animation
            setTimeout(() => {
                setPassword('');
                navigate('/');   // Redirect to Home
                setIsLoggedIn(true);
                // setUserId(response.data.data._id);

                setLoading(false);  // Stop loading animation after redirect
            }, 2000);
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
        }
    };



    // Fetch all users from the API
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/v1/get-users`);


            setTimeout(() => {
                // Sort users by Points in descending order
                const sortedUsers = response.data.data.sort((a, b) => b.Points - a.Points);

                setUsers(sortedUsers);
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };


    return (
        <UserContext.Provider value={{ firstName, lastName, email, username, password, users, loading, isLoggedIn, userId, token, setfirstName, setlastName, setEmail, setuserName, setPassword, userRegistration, userLogin, setUsers, setLoading, setIsLoggedIn, fetchUsers }}>
            {children}
        </UserContext.Provider>
    );

};

export default UserContextProvider;