import styles from "./cardsGrid.module.css";
import ExcursionCard from "../ExcursionCard/ExcursionCard";
import { getData } from "../../services/get";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const CardsGrid = ({ searchTerm, sortOption, selectedCategories }) => {
  const [excursions, setExcursions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      const data = await getData("excursions");
      let filtered = data.tours;

      // Filter by category
      if (selectedCategories && selectedCategories.length > 0) {
        filtered = filtered.filter((excursion) =>
          selectedCategories.includes(excursion.category_id)
        );
      }

      // Filter by title
      if (searchTerm) {
        filtered = filtered.filter((excursion) =>
          excursion.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Sort by price
      if (sortOption === "priceAsc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption === "priceDesc") {
        filtered.sort((a, b) => b.price - a.price);
      }

      setExcursions(filtered);
    } catch (error) {
      console.error("Error fetching excursions:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [searchTerm, sortOption, selectedCategories]);


  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader color="#808080" size={20} />
      </div>
    );
  }

  return (
    <section className={styles.grid}>
      {excursions.length === 0 ? (
        <p className={styles.noExcursions}>
          We couldn’t find any available excursions right now. Please check back
          later.
        </p>
      ) : (
        excursions.map((exc) => <ExcursionCard key={exc.id} excursion={exc} />)
      )}
    </section>
  );
};

export default CardsGrid;
