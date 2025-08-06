import "./App.css";
import Nav from "./components/Nav/Nav";
import MainPage from "./pages/MainPage/MainPage";
import ExcurionDetails from "./components/ExcursionDetails/ExcursionDetails";
import { Routes, Route } from "react-router";

// App.jsx mostly used for add layouts, navbar, footers
// In bigger pages somethimes creating separate file for layouts
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<ExcurionDetails />} />
      </Routes>
    </>
  );
}

export default App;
