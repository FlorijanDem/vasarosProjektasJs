// For adapt to different screens with standart css
// you can use with media queries
import styles from "./mainPage.module.css";
import CardsGrid from "../../components/CardsGrid/CardsGrid";


const MainPage = ({searchTerm, sortOption, selectedCategories}) => {
  // Must be showing list with excursions

  return (
    <div className={styles.mainPage}>
    <CardsGrid 
    searchTerm={searchTerm} 
    sortOption={sortOption}
    selectedCategories={selectedCategories}
    /> 
    </div>
  );
};

export default MainPage;
