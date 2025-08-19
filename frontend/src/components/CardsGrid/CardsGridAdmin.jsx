import styles from "./cardsGrid.module.css";
import ExcursionCardAdmin from "../ExcursionCard/ExcursionCardAdmin";
import ExcursionCardAddAdmin from "../ExcursionCard/ExcursionCardAddAdmin";
import { getData } from "../../services/get";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const CardsGridAdmin = () => {
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
        <>
        <p className={styles.noExcursions}>
          We couldn’t find any available excursions right now, create a new one.
        </p>
        </>
      ) : (
        excursions.map((exc) => <ExcursionCardAdmin key={exc.id} excursion={exc} />)
      )}
       <ExcursionCardAddAdmin/>
    </section>
  );
};

export default CardsGridAdmin;
