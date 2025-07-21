// For adapt to different screens with standart css
// you can use with media queries
import moon from "../../../src/assets/moon.svg";
const Nav = () => {
  return (
    <nav className="w-full flex-row flex h-[8rem] bg-white sticky shadow-[0rem_0.125rem_0.25rem_0rem_rgba(0,0,0,0.0562)] items-center px-8 max-md:px-4 max-lg:px-12 top-0" >
      <div className="flex w-3/4  max-2xl:w-1/2">
        <h2 className="font-['Nunito_Sans',sans-serif] font-extrabold text-[2.4rem] max-md:text-[1.4rem]  ">
          Ekskursijos
        </h2>
      </div>
      <div className="flex w-1/4 max-2xl:w-1/2 justify-between ">
        <div className="flex gap-2 w-1/3 ">
          <img src={moon} alt="Sign up icon" className="max-md:hidden" />
          <button className="font-['Nunito_Sans',sans-serif] font-semibold text-[1.6rem] max-md:text-[1.2rem] cursor-pointer">
            Sign up
          </button>
        </div>
        <div className="flex gap-2 w-1/3">
          <img src={moon} alt="Log in icon" className="max-md:hidden" />
          <button className="font-['Nunito_Sans',sans-serif] font-semibold text-[1.6rem] max-md:text-[1.2rem] cursor-pointer">
            Log in
          </button>
        </div>
        <div
          className="flex gap-2 w-1/3
        "
        >
          <img src={moon} alt="Dark mode icon" className="max-md:hidden" />
          <button className="font-['Nunito_Sans',sans-serif] font-semibold text-[1.6rem] max-md:text-[1.2rem] cursor-pointer">
            Dark Mode
          </button>
        </div>
      </div>
      {/* Add navigation links here */}
    </nav>
  );
};

export default Nav;
