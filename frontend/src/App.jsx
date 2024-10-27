import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SignInSignUp from './Pages/SignInSignUp';
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Home from './Pages/Home';
import Leaderboard from './Pages/Leaderboard';
import UserContextProvider from './context/userContext';


function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
