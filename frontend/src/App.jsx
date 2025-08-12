import "./App.css";
import Nav from "./components/Nav/Nav";
import MainPage from "./pages/MainPage/MainPage";
import SearchFilterSort from "./components/SearchFilterSort/SearchFilterSort";
import { useState } from "react";

// App.jsx mostly used for add layouts, navbar, footers
// In bigger pages somethimes creating separate file for layouts
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("priceAsc");
  const [selectedCategories, setSelectedCategories] = useState([]);
  return (
    <>
      <Nav />
      <SearchFilterSort 
      setSearchTerm={setSearchTerm} 
      sortOption={sortOption} 
      setSortOption={setSortOption} 
      selectedCategories={selectedCategories} 
      setSelectedCategories={setSelectedCategories}
      />
      <MainPage 
      searchTerm={searchTerm} 
      sortOption={sortOption}
      selectedCategories={selectedCategories}
      />
    </>
  );
}

export default App;
