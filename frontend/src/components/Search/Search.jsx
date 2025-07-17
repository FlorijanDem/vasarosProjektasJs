import { useState } from "react";

const Search = () => {
  // Here existed text which user want to search
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    // Prevent default need for do not reload page while
    // enter values
    e.preventDefault();
    // Handle search logic here
    alert(`Searching for: ${query}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
