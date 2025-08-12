import LoginModal from "./LoginModal";
import RegisterModal from "../Register/RegisterModal";

const ModalController = ({
  showLogin,
  showRegister,
  openRegister,
  closeLogin,
  closeRegister,
  openLogin,
  onAuthSuccess,
  setIsLoggedIn,
}) => {
  return (
    <>
      <LoginModal
        isOpen={showLogin}
        onClose={closeLogin}
        onSwitchRegister={openRegister}
        onLoginSuccess={onAuthSuccess}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={closeRegister}
        onSwitchLogin={openLogin}
        onRegisterSuccess={onAuthSuccess}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
};

export default ModalController;