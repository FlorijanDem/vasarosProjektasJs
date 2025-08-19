import styles from "./cardsGrid.module.css";
import ExcursionCard from "../ExcursionCard/ExcursionCard";

import { ClipLoader } from "react-spinners";
import { ExcursionContext } from "../../contexts/contexts";
import { useContext, useEffect, useState } from "react";

const CardsGrid = ({ searchTerm, sortOption, selectedCategories }) => {
  const { excursions, loading } = useContext(ExcursionContext);
  const [filteredExcursions, setFilteredExcursions] = useState([]);

  useEffect(() => {
    if (!excursions) return;

    let filtered = [...excursions];

    // Filter by category
    if (selectedCategories?.length > 0) {
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

    setFilteredExcursions(filtered);
  }, [excursions, searchTerm, sortOption, selectedCategories]);

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
