import moon from "../../../src/assets/moon.svg";
import { useState, useEffect } from "react";
import ModalController from "../../pages/Login/ModalController";
import { Link } from "react-router";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import "../../styles/global.css";

const Nav = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  /*useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);*/

  const toggleTheme = () => {
    console.log("theme toggled");
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const logout = async () => {
    await axios.get(`${API_URL}/logout`, {
      withCredentials: true,
    });
    setIsLoggedIn(false);
  };

  const hasJwtCookie = () => {
    return document.cookie.includes("jwt=");
  };

  useEffect(() => {
    setIsLoggedIn(hasJwtCookie());
  }, [showAuth, showLogin, showRegister]);

  const openAuth = (type) => {
    setShowAuth(true);
    setShowLogin(type === "login");
    setShowRegister(type === "register");
  };

  const closeLogin = () => {
    setShowLogin(false);
  };
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

  return isLoggedIn ? (
    <nav className="w-full flex-row flex h-[8rem] sticky bg-[var(--lighter-background-color)] shadow-[0rem_0.125rem_0.25rem_0rem_rgba(0,0,0,0.0562)] items-center px-8 max-md:px-4 max-lg:px-12 top-0 ">
      <div className="flex w-3/4  max-2xl:w-1/2 max-md:w-1/3">
        <Link to="/">
          <h2 className="font-['Nunito_Sans',sans-serif] font-extrabold text-[2.4rem] max-md:text-[1.4rem]  ">
            Ekskursijos
          </h2>
        </Link>
      </div>
      <div className="flex w-1/4 max-2xl:w-1/2 max-md:w-2/3 justify-between ">
        <div className="flex gap-2 w-1/3 max-md:w-1/2">
          <button className="font-['Nunito_Sans',sans-serif] font-semibold text-[1.6rem] max-md:text-[1.2rem] cursor-pointer">
            My Dashboard
          </button>
        </div>
        <div className="flex gap-2 w-1/3">
          <img src={moon} alt="Log in icon" className="max-md:hidden" />
          <button
            onClick={logout}
            className="font-['Nunito_Sans',sans-serif] font-semibold text-[1.6rem] max-md:text-[1.2rem] cursor-pointer"
          >
            Logout
          </button>
        </div>
        <div className="flex gap-2 w-1/3">
          <img src={moon} alt="Dark mode icon" className="max-md:hidden" />
          <button className="font-['Nunito_Sans',sans-serif] font-semibold text-[1.6rem] max-md:text-[1.2rem] cursor-pointer">
            Dark Mode
          </button>
        </div>
      </div>
      {showAuth && (
        <ModalController
          showLogin={showLogin}
          showRegister={showRegister}
          openRegister={openRegister}
          closeLogin={closeLogin}
          closeRegister={closeRegister}
        />
      )}
    </nav>
  ) : (
    <nav className="w-full flex-row flex h-[8rem] sticky bg-[var(--lighter-background-color)] shadow-[0rem_0.125rem_0.25rem_0rem_rgba(0,0,0,0.0562)] items-center px-8 max-md:px-4 max-lg:px-12 top-0">
      <div className="flex w-3/4  max-2xl:w-1/2">
        <Link to="/">
          <h2 className="font-['Nunito_Sans',sans-serif] font-extrabold text-[2.4rem] max-md:text-[1.4rem]  ">
            Ekskursijos
          </h2>
        </Link>
      </div>
      <div className="flex w-1/4 max-2xl:w-1/2 justify-between ">
        <div className="flex gap-2 w-1/3 ">
          <img src={moon} alt="Sign up icon" className="max-md:hidden" />
          <button
            onClick={() => openAuth("register")}
            className="font-['Nunito_Sans',sans-serif] font-semibold text-[1.6rem] max-md:text-[1.2rem] cursor-pointer"
          >
            Sign up
          </button>
        </div>
        <div className="flex gap-2 w-1/3">
          <img src={moon} alt="Log in icon" className="max-md:hidden" />
          <button
            onClick={() => openAuth("login")}
            className="font-['Nunito_Sans',sans-serif] font-semibold text-[1.6rem] max-md:text-[1.2rem] cursor-pointer"
          >
            Log in
          </button>
        </div>
        <div className="flex gap-2 w-1/3">
          <img src={moon} alt="Dark mode icon" className="max-md:hidden" />
          <button
            className="font-['Nunito_Sans',sans-serif] font-semibold text-[1.6rem] max-md:text-[1.2rem] cursor-pointer"
            onClick={() => {
              toggleTheme();
              setDarkMode(!darkMode);
            }}
          >
            Dark Mode
          </button>
        </div>
      </div>
      {showAuth && (
        <ModalController
          showLogin={showLogin}
          showRegister={showRegister}
          openRegister={openRegister}
          closeLogin={closeLogin}
          closeRegister={closeRegister}
          openLogin={openLogin}
        />
      )}
    </nav>
  );
};
export default Nav;
