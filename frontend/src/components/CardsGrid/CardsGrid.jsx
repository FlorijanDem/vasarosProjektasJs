import styles from "./cardsGrid.module.css";
import ExcursionCard from "../ExcursionCard/ExcursionCard";

const CardsGrid = () => {
  return (
    <section className={styles.grid}>
      <ExcursionCard />
      <ExcursionCard />
      <ExcursionCard />
      <ExcursionCard />
      <ExcursionCard />
      <ExcursionCard />
      <ExcursionCard />
    </section>
  );
};

export default CardsGrid;
