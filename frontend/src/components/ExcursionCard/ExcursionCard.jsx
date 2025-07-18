import styles from "./excursionCard.module.css";
import { renderStars } from "../../utils/renderStars";

const excursion = {
  image: "https://walkablevilnius.com/content/uploads/1_3.jpg",
  title: "Vilnius Old Town Tour",
  rating: 3,
  closestDate: "8/1/2025",
  duration: "3 hours",
  price: 36,
};

const ExcursionCard = () => {
  return (
    <article className={styles.card}>
      <figure className={styles.figure}>
        <img
          className={styles.cardImg}
          src={excursion.image}
          alt={excursion.title}
        />
        <div className={styles.textContainer}>
          <h2 className={styles.cardTitle}>{excursion.title}</h2>
          <div className={styles.ratingSection}>
            <div className={styles.stars}>{renderStars(excursion.rating)}</div>
            <p className={styles.rating}>{excursion.rating}</p>
          </div>
          <div className={styles.dateSection}>
            <p>Closest date: </p>
            <p>{excursion.closestDate}</p>
          </div>
          <div className={styles.durationPriceSection}>
            <p>{excursion.duration}</p>
            <p>{`${excursion.price} €`}</p>
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.moreInfoBtn}>More info</button>
          </div>
        </div>
      </figure>
    </article>
  );
};

export default ExcursionCard;
