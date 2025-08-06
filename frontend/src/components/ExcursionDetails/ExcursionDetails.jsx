import styles from "./excursionDetails.module.css";
import { useParams } from "react-router";
import { useContext } from "react";
import { ExcursionContext } from "../../contexts/contexts";
import { ClipLoader } from "react-spinners";

const ExcursionDetails = () => {
  const { id } = useParams();
  const { excursions, loading } = useContext(ExcursionContext);

  if (loading)
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader color="#808080" size={20} />
      </div>
    );

  const excursion = excursions.find((excursion) => excursion.id === Number(id));

  console.log(excursion);

  if (!excursion)
    return (
      <p className={styles.noExcursionText}>
        Excursion not found blabababa hello.
      </p>
    );

  return (
    <div>
      <h1>{excursion.title}</h1>
      <p>{excursion.location}</p>
      <p>{excursion.price} €</p>
      <p>{excursion.description}</p>
    </div>
  );
};

export default ExcursionDetails;
