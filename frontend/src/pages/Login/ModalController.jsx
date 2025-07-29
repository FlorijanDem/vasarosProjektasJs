import LoginModal from "./LoginModal";
import RegisterModal from "../Register/RegisterModal";

const ModalController = ({
  showLogin,
  showRegister,
  openRegister,
  closeLogin,
  closeRegister,
  openLogin
}) => {
  return (
    <>
      <LoginModal
        isOpen={showLogin}
        onClose={closeLogin}
        onSwitchRegister={openRegister}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={closeRegister}
        onSwitchLogin={openLogin}
      />
    </>
  );
};

export default ModalController;