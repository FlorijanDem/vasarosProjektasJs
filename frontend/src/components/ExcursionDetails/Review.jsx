import styles from "./review.module.css";
import { renderStars } from "../../utils/renderStars";
import { formatToMonthDayYear } from "../../utils/dateTimeManipulations";

const Review = ({ review }) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.layoutWrapper}>
        <div className={styles.textWrapper}>
          <h3 className={styles.reviewerName}>{review.email}</h3>
          <p className={styles.dateText}>
            {formatToMonthDayYear(review.created_at)}
          </p>
        </div>
        <div className={styles.stars}>{renderStars(review.rating)}</div>
      </div>
      <p>{review.comment}</p>
    </div>
  );
};

export default Review;
