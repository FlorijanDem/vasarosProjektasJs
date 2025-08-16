import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import MainPage from "./pages/MainPage/MainPage";
import ExcurionDetails from "./components/ExcursionDetails/ExcursionDetails";
import ModalController from "./pages/Login/ModalController";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes("jwt="));
  }, [showAuth, showLogin, showRegister]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
      });
      setUserRole(res.data.role);
      setUserEmail(res.data.email);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Not logged in:", error);
      setUserRole(null);
      setUserEmail(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
      setIsLoggedIn(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const openAuth = (type) => {
    setShowAuth(true);
    setShowLogin(type === "login");
    setShowRegister(type === "register");
  };

  const closeLogin = () => setShowLogin(false);
  const closeRegister = () => {
    setShowRegister(false);
    setShowAuth(false);
  };
  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };
  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowAuth(true);
  };

  return (
    <>
      <Nav
        isLoggedIn={isLoggedIn}
        logout={logout}
        openAuth={openAuth}
        userRole={userRole}
        userEmail={userEmail}
      />
      <Routes>
        <Route path="/" element={<MainPage openAuth={openAuth} />} />
        <Route path="/:id" element={<ExcurionDetails openAuth={openAuth} />} />
      </Routes>
      {showAuth && (
        <ModalController
          showLogin={showLogin}
          showRegister={showRegister}
          openRegister={openRegister}
          openLogin={openLogin}
          closeLogin={closeLogin}
          closeRegister={closeRegister}
          onAuthSuccess={fetchUser}
        />
      )}
    </>
  );
}

export default App;
