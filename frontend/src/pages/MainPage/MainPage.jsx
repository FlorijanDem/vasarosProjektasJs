// For adapt to different screens with standart css
// you can use with media queries
import styles from "./mainPage.module.css";
import CardsGrid from "../../components/CardsGrid/CardsGrid";

const MainPage = () => {
  // Must be showing list with excursions

  return (
    <div className={styles.mainPage}>
      <CardsGrid />
    </div>
  );
};

export default MainPage;
