import styles from "./cardsGrid.module.css";
import ExcursionCard from "../ExcursionCard/ExcursionCard";

import { ClipLoader } from "react-spinners";
import { ExcursionContext } from "../../contexts/contexts";
import { useContext } from "react";

const CardsGrid = () => {
  const { excursions, loading } = useContext(ExcursionContext);

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
