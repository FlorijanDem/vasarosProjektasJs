import styles from "./excursionDetails.module.css";
import "react-day-picker/dist/style.css";
import { useParams, useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react";
import { ExcursionContext } from "../../contexts/contexts";
import { ClipLoader } from "react-spinners";
import LeftArrowLight from "../../assets/left-arrow.png";
import LeftArrowDark from "../../assets/left-arrow-dark.png";
import { renderStars } from "../../utils/renderStars";
import {
  formatInterval,
  getClosestDate,
} from "../../utils/dateTimeManipulations";
import DefaultExcursionImg from "../../assets/default-tour-img.avif";
import { DayPicker } from "react-day-picker";
import { getData } from "../../services/get";
import Review from "./Review";
import { enUS } from "date-fns/locale";
import BookModal from "./BookModal";
import CancelModal from "./CancelModal";
import ReviewModal from "./ReviewModal";

const ExcursionDetails = ({ openAuth, isLoggedIn, userId }) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { id } = useParams();
  const { excursions, loading } = useContext(ExcursionContext);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 4,
    total: 0,
    totalPages: 1,
  });
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(0);

  //modal controls
  const openRegister = () => {
    setShowRegisterModal(true);
  };

  const closeRegister = () => {
    setShowRegisterModal(false);
  };
  const openCancel = () => {
    setShowCancelModal(true);
  };

  const closeCancel = () => {
    setShowCancelModal(false);
  };

  const openReview = () => {
    setShowReviewModal(true);
  };

  const closeReview = () => {
    setShowReviewModal(false);
  };

  //arrow change
  const [arrowSrc, setArrowSrc] = useState(() =>
    document.documentElement.getAttribute("data-theme") === "dark"
      ? LeftArrowDark
      : LeftArrowLight
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute("data-theme");
      setArrowSrc(theme === "dark" ? LeftArrowDark : LeftArrowLight);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const fetchReviews = async (p = 1) => {
    try {
      setReviewsLoading(true);
      setReviewsError("");
      const data = await getData(`reviews/${id}?page=${p}&limit=${limit}`);
      const { reviews, pagination } = data.data;
      setReviews(reviews);
      setPagination(pagination);
      setPage(pagination.page);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviewsError("Failed to load reviews.");
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(page);
  }, [id, page, refreshFlag]);

  const handleReviewSuccess = () => {
    setPage(1);
    setRefreshFlag((f) => f + 1);
  };

  if (loading)
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader color="#808080" size={20} />
      </div>
    );

  const excursion = excursions.find((excursion) => excursion.id === Number(id));

  if (!excursion)
    return <p className={styles.noExcursionText}>Excursion not found.</p>;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const availableDates = excursion.tour_dates
    .map((d) => new Date(d))
    .filter((d) => {
      const nd = new Date(d);
      nd.setHours(0, 0, 0, 0);
      return nd >= today;
    });

  const closest = availableDates.length ? getClosestDate(availableDates) : null;

  return (
    <div className={styles.detailsLayout}>
      <button className={styles.backButton} onClick={() => navigate(`/`)}>
        <img src={arrowSrc} alt="Back" className={styles.arrowIcon} />
        Back
      </button>
      <section className={styles.infoSection}>
        <figure className={styles.figure}>
          {!isImageLoaded && (
            <div className={styles.imgLoaderContainer}>
              <ClipLoader color="#808080" size={20} />
            </div>
          )}

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
              </span>{" "}
              &nbsp;
              <span>{excursion.average_rating}</span>
            </p>
            {closest ? (
              <p className={styles.greyText}>
                Closest date:&nbsp;{closest.toLocaleDateString()}
              </p>
            ) : (
              <p className={styles.greyText}>
                Closest date:&nbsp;
                <span className={styles.noDateAvailable}>
                  No upcoming dates available
                </span>
              </p>
            )}
            <p className={styles.greyText}>
              Duration: {formatInterval(excursion.duration)}
            </p>
            <p className={styles.greyText}>Price: {`${excursion.price} €`}</p>
            <p className={styles.greyText}>Location: {excursion.location}</p>
          </div>
          {isLoggedIn ? (
            closest ? (
              <>
                <button className={styles.registerBtn} onClick={openRegister}>
                  Reserve Excursion
                </button>
                {/* Sujungt su logika veliau */}
                <button className={styles.cancelResBtn} onClick={openCancel}>
                  Cancel Reservation
                </button>
                <button className={styles.cancelResBtn} onClick={openReview}>
                  Leave Review
                </button>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </section>
      <div className={styles.sectionWrapper}>
        <section className={styles.calendarSection}>
          <h2 className={styles.subtitle}>Available dates</h2>
          <div className={styles.calendarWrapper}>
            <DayPicker
              mode="single"
              selected={undefined}
              disabled={{ before: today }}
              modifiers={{ available: availableDates }}
              modifiersClassNames={{ available: styles.highlight }}
              locale={{
                ...enUS,
                options: { ...enUS.options, weekStartsOn: 1 },
              }}
            />
          </div>
          {closest ? (
            <div className={styles.signupText}>
              {isLoggedIn ? (
                ""
              ) : (
                <>
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
                </>
              )}
            </div>
          ) : (
            <>
              <span className={styles.noDateAvailable}>
                No upcoming dates available
              </span>
              <div className={styles.signupText}>
                {isLoggedIn ? (
                  ""
                ) : (
                  <>
                    <p className={styles.greyText}>
                      Create an account to book your spot on other
                      excursions.&nbsp;
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
                  </>
                )}
              </div>
            </>
          )}
        </section>
        <section className={styles.reviewsSection}>
          <h2 className={styles.subtitle}>Reviews</h2>
          {reviewsLoading && (
            <p className={styles.greyText}>Loading reviews…</p>
          )}
          {reviewsError && <p className={styles.errorText}>{reviewsError}</p>}

          {!reviewsLoading && !reviewsError && (
            <>
              <section className={styles.reviews}>
                {reviews.length === 0 ? (
                  <p className={styles.greyText}>
                    Be the first to share your thoughts! No reviews yet.
                  </p>
                ) : (
                  reviews.map((review) => (
                    <Review key={review.id} review={review} />
                  ))
                )}
              </section>
              {pagination.totalPages > 1 && (
                <nav className={styles.pagination}>
                  <button
                    className={styles.pageBtn}
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Prev
                  </button>

                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  ).map((p) => (
                    <button
                      key={p}
                      className={`${styles.pageBtn} ${
                        p === page ? styles.pageBtnActive : ""
                      }`}
                      onClick={() => setPage(p)}
                      aria-current={p === page ? "page" : undefined}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    className={styles.pageBtn}
                    disabled={page >= pagination.totalPages}
                    onClick={() =>
                      setPage((p) => Math.min(pagination.totalPages, p + 1))
                    }
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )}
        </section>
      </div>
      {/* Modals */}
      {showRegisterModal && (
        <BookModal
          excursion={excursion}
          availableDates={availableDates}
          userId={userId}
          onClose={closeRegister}
        />
      )}
      {showCancelModal && (
        <CancelModal excursion={excursion} onClose={closeCancel} />
      )}
      {showReviewModal && (
        <ReviewModal
          excursion={excursion}
          onClose={closeReview}
          userId={userId}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  );
};

export default ExcursionDetails;
