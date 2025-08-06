import { useParams } from "react-router";
import { useContext } from "react";
import { ExcursionContext } from "../../contexts/contexts";

const ExcursionDetails = () => {
  const { id } = useParams();
  const { excursions, loading } = useContext(ExcursionContext);

  // While loading, you can show a spinner or message
  if (loading) return <p>Loading...</p>;

  // Convert id to number (if your data uses numbers)
  const excursion = excursions.find((e) => e.id === Number(id));

  if (!excursion) return <p>Excursion not found.</p>;

  return (
    <div>
      <h1>{excursion.title}</h1>
      <p>{excursion.location}</p>
      <p>{excursion.price} €</p>
      <p>{excursion.description}</p>
      {/* Add more info if available */}
    </div>
  );
};

export default ExcursionDetails;
