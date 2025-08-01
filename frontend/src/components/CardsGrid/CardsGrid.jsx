import styles from "./cardsGrid.module.css";
import ExcursionCard from "../ExcursionCard/ExcursionCard";
import { getData } from "../../services/get";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const CardsGrid = () => {
  const [excursions, setExcursions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExcursion, setSelectedExcursion] = useState(null);

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
        <p className={styles.noExcursions}>
          We couldn’t find any available excursions right now. Please check back
          later.
        </p>
      ) : (
        excursions.map((exc) => (
          <ExcursionCard
            key={exc.id}
            excursion={exc}
            onOpen={() => {
              setSelectedExcursion(exc);
            }}
          />
        ))
      )}

      {selectedExcursion && (
        <DetailsModal
          excursion={selectedExcursion}
          onClose={() => setSelectedExcursion(null)}
        />
      )}
    </section>
  );
};

export default CardsGrid;
