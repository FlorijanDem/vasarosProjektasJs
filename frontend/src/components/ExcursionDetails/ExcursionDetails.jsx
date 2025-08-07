import styles from "./excursionDetails.module.css";
import "react-day-picker/dist/style.css";
import { useParams, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { ExcursionContext } from "../../contexts/contexts";
import { ClipLoader } from "react-spinners";
import LeftArrow from "../../assets/left-arrow.png";
import { renderStars } from "../../utils/renderStars";
import {
  formatInterval,
  getClosestDate,
} from "../../utils/dateTimeManipulations";
import DefaultExcursionImg from "../../assets/default-tour-img.avif";
import { DayPicker } from "react-day-picker";

const ExcursionDetails = ({ openAuth }) => {
  const { id } = useParams();
  const { excursions, loading } = useContext(ExcursionContext);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();

  if (loading)
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader color="#808080" size={20} />
      </div>
    );

  const excursion = excursions.find((excursion) => excursion.id === Number(id));
  const availableDates = excursion.tour_dates.map((date) => new Date(date));

  if (!excursion)
    return <p className={styles.noExcursionText}>Excursion not found.</p>;

  return (
    <div className={styles.detailsLayout}>
      <button className={styles.backButton} onClick={() => navigate(`/`)}>
        <img src={LeftArrow} alt="Back" className={styles.arrowIcon} />
        Back
      </button>

      <section className={styles.infoSection}>
        <figure className={styles.figure}>
          <img
            className={`${styles.cardImg} ${
              !isImageLoaded ? styles.hidden : ""
            }`}
            src={excursion.photo_url || DefaultExcursionImg}
            alt={excursion.title}
            onLoad={() => setIsImageLoaded(true)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DefaultExcursionImg;
            }}
          />
        </figure>
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>{excursion.title}</h1>
          <p className={styles.desc}>{excursion.description}</p>
          <div className={styles.additionalInfo}>
            <p className={styles.greyText}>
              Average rating: &nbsp;
              <span className={styles.stars}>
                {renderStars(excursion.average_rating)}
              </span>
            </p>
            <p className={styles.greyText}>
              Closest date:{" "}
              {getClosestDate(excursion.tour_dates)?.toLocaleDateString()}
            </p>
            <p className={styles.greyText}>
              Duration: {formatInterval(excursion.duration)}
            </p>
            <p className={styles.greyText}>Price: {`${excursion.price} €`}</p>
            <p className={styles.greyText}>Location: {excursion.location}</p>
          </div>
        </div>
      </section>

      {/* Later */}
      <div className={styles.sectionWrapper}>
        <section className={styles.calendarSection}>
          <h2 className={styles.subtitle}>Available dates</h2>
          <div className={styles.calendarWrapper}>
            <DayPicker
              mode="single"
              selected={undefined}
              disabled={() => true}
              modifiers={{ available: availableDates }}
              modifiersClassNames={{ available: styles.highlight }}
            />
          </div>
          <div className={styles.signupText}>
            <p className={styles.greyText}>
              Create an account to book your spot on this excursion.&nbsp;
            </p>
            <span
              className={`${styles.signupBtn} ${styles.greyText}`}
              onClick={() => openAuth("register")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") openAuth("register");
              }}
            >
              Sign up
            </span>
          </div>
        </section>
        <section className={styles.reviewsSection}>
          <h2 className={styles.subtitle}>Reviews</h2>
          <div className={styles.commentCard}></div>
          <div className={styles.commentCard}></div>
          <div className={styles.commentCard}></div>
          <div className={styles.commentCard}></div>
        </section>
      </div>
    </div>
  );
};

export default ExcursionDetails;
