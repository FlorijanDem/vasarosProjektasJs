import moon from "../../../src/assets/moon.svg";
import { Link } from "react-router-dom"; // Correct router import

const Nav = ({ isLoggedIn, logout, openAuth }) => {
  return (
    <nav className="w-full flex-row flex h-[8rem] bg-white sticky shadow-[0rem_0.125rem_0.25rem_0rem_rgba(0,0,0,0.0562)] items-center px-8 max-md:px-4 max-lg:px-12 top-0">
      <div className="flex w-3/4 max-2xl:w-1/2 max-md:w-1/3">
        <Link to="/">
          <h2 className="font-['Nunito_Sans',sans-serif] font-extrabold text-[2.4rem] max-md:text-[1.4rem]">
            Ekskursijos
          </h2>
        </Link>
      </div>

      <div className="flex w-1/4 max-2xl:w-1/2 max-md:w-2/3 justify-between">
        {isLoggedIn ? (
          <>
            <div className="flex gap-2 w-1/3 max-md:w-1/2">
              <button className="font-['Nunito_Sans',sans-serif] font-semibold text-[1.6rem] max-md:text-[1.2rem] cursor-pointer">
                My Dashboard
              </button>
            </div>
            <div className="flex gap-2 w-1/3">
              <img src={moon} alt="Logout icon" className="max-md:hidden" />
              <button
                onClick={logout}
                className="font-['Nunito_Sans',sans-serif] font-semibold text-[1.6rem] max-md:text-[1.2rem] cursor-pointer"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-2 w-1/3">
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
          </>
        )}

        <div className="flex gap-2 w-1/3">
          <img src={moon} alt="Dark mode icon" className="max-md:hidden" />
          <button className="font-['Nunito_Sans',sans-serif] font-semibold text-[1.6rem] max-md:text-[1.2rem] cursor-pointer">
            Dark Mode
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
