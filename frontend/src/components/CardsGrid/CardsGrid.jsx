import styles from "./cardsGrid.module.css";
import ExcursionCard from "../ExcursionCard/ExcursionCard";
import { getData } from "../../services/get";
import { useState, useEffect } from "react";

const CardsGrid = () => {
  const [excursions, setExcursions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setExcursions(data.tours);
      } catch (error) {
        console.error("Error fetching excursions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.grid}>
      {excursions.map((exc) => (
        <ExcursionCard key={exc.id} excursion={exc} />
      ))}
    </section>
  );
};

export default CardsGrid;
