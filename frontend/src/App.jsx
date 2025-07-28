import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import ReviewModal from "./components/ReviewModal/ReviewModal";
import MainPage from "./pages/MainPage/MainPage";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

// App.jsx mostly used for add layouts, navbar, footers
// In bigger pages somethimes creating separate file for layouts
function App() {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  return (
    <>
      <Nav openReviewModal={() => setIsReviewOpen(true)} />
      <ReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

