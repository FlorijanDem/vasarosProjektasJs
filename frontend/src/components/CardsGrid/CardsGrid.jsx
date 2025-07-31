import styles from "./cardsGrid.module.css";
import ExcursionCard from "../ExcursionCard/ExcursionCard";
import { getData } from "../../services/get";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const CardsGrid = () => {
  const [excursions, setExcursions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("excursions");
        setExcursions(data.tours);
      } catch (error) {
        console.error("Error fetching excursions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <p className={styles.noExcursions}>No excursions available.</p>
      ) : (
        excursions.map((exc) => <ExcursionCard key={exc.id} excursion={exc} />)
      )}
    </section>
  );
};

export default CardsGrid;
