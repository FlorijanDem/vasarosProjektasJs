import "./App.css";
import Nav from "./components/Nav/Nav";
import MainPage from "./pages/MainPage/MainPage";

// App.jsx mostly used for add layouts, navbar, footers
// In bigger pages somethimes creating separate file for layouts
function App() {
  return (
    <>
      <Nav />
      <MainPage />
    </>
  );
}

export default App;
