import { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "../Register/RegisterModal";

const ModalController = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);


  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const closeLogin = () => setShowLogin(false);
  const closeRegister = () => setShowRegister(false);

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
      />
    </>
  );
};

export default ModalController;