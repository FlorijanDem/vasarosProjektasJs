// For adapt to different screens with standart css
// you can use with media queries
import moon from "../../../src/assets/moon.svg";
const Nav = () => {
  return (
    <nav className="w-full flex-row flex h-[5rem] fixed shadow-[0rem_0.125rem_0.25rem_0rem_rgba(0,0,0,0.0562)] items-center px-20">
      <div className="flex w-3/4">
        <h2 className="font-['Nunito_Sans',sans-serif] font-extrabold text-[1.5rem]">
          Ekskursijos
        </h2>
      </div>
      <div className="flex  w-1/4 justify-between">
        <div className="flex gap-2">
          <img src={moon} alt="Sign up icon"/>
          <button className="font-['Nunito_Sans',sans-serif] font-semibold text-[1rem] cursor-pointer">
            Sign up
          </button>
        </div>
        <div className="flex gap-2">
          <img src={moon} alt="Log in icon"/>
          <button className="font-['Nunito_Sans',sans-serif] font-semibold text-[1rem] cursor-pointer">
            Log in
          </button>
        </div>
        <div className="flex gap-2">
          <img src={moon} alt="Dark mode icon"/>
          <button className="font-['Nunito_Sans',sans-serif] font-semibold text-[1rem] cursor-pointer">
            Dark Mode
          </button>
        </div>
      </div>
      {/* Add navigation links here */}
    </nav>
  );
};

export default Nav;
