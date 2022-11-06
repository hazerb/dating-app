import './App.css';
import { Navigate, Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import Landing from "./pages/landing";
import Home from "./pages/home"
import Profile from "./pages/profile"
import Matches from "./pages/matches"

function App() {

  const token = localStorage.getItem("token");
  const [isLoggedIn, setLoggedIn] = useState(false)

  let loggedInRoutes = (
    <Routes>
      <Route path="/home" element={<Home setLoggedIn={setLoggedIn}/>} />
      <Route path="/profile" element={<Profile setLoggedIn={setLoggedIn}/>} />
      <Route path="/matches" element={<Matches setLoggedIn={setLoggedIn}/>} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );

  let loggedOutRoutes = (
    <Routes>
      <Route path="/" element= {<Landing setLoggedIn={setLoggedIn}/>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  useEffect(() => {
    if(token != null){
      setLoggedIn(true)
    }
  }, [])

  return  isLoggedIn ? loggedInRoutes : loggedOutRoutes;
}

export default App;
