import styles from "./excursionCard.module.css";
import { renderStars } from "../../utils/renderStars";
import {
  getClosestDate,
  formatInterval,
} from "../../utils/dateTimeManipulations";
import DefaultExcursionImg from "../../assets/default-tour-img.avif";

const ExcursionCard = ({ excursion }) => {
  return (
    <article className={styles.card}>
      <figure className={styles.figure}>
        <img
          className={styles.cardImg}
          src={excursion.photo_url || DefaultExcursionImg}
          alt={excursion.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = DefaultExcursionImg;
          }}
        />
        <div className={styles.textContainer}>
          <h2 className={styles.cardTitle}>{excursion.title}</h2>
          <div className={styles.ratingSection}>
            <div className={styles.stars}>
              {renderStars(excursion.average_rating)}
            </div>
            <p className={styles.rating}>{excursion.average_rating}</p>
          </div>
          <p className={styles.dateSection}>{excursion.location}</p>
          <div className={styles.dateSection}>
            <p>Closest date: </p>
            <p>{getClosestDate(excursion.tour_dates)?.toLocaleDateString()}</p>
          </div>
          <div className={styles.durationPriceSection}>
            <p>{formatInterval(excursion.duration)}</p>
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
