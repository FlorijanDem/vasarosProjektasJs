import styles from "./cardsGrid.module.css";
import ExcursionCard from "../ExcursionCard/ExcursionCard";
import { getData } from "../../services/get";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const CardsGrid = ({ searchTerm, sortOption, selectedCategories }) => {
  const [excursions, setExcursions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("excursions");

        let filteredData = data.tours;

        // Filter by name
        if (searchTerm) {
          filteredData = filteredData.filter((excursion) =>
            excursion.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // filter by categories
        if (selectedCategories.length > 0) {
          filteredData = filteredData.filter((excursion) =>
            selectedCategories.includes(excursion.category_id)
          );
        }

        // Filter by price
        if (sortOption === "priceAsc") {
          filteredData.sort((a, b) => a.price - b.price); // filter by high price
        } else if (sortOption === "priceDesc") {
          filteredData.sort((a, b) => b.price - a.price); // filter by low price
        }

        setExcursions(filteredData);
      } catch (error) {
        console.error("Error fetching excursions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, sortOption, selectedCategories]); // filter options and search term

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
