import { useState, useEffect } from "react";
import { ExcursionContext } from "./contexts";
import { getData } from "../services/get";

export const ExcursionContextProvider = ({ children }) => {
  const [excursions, setExcursions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExcursions = async () => {
      try {
        const data = await getData("excursions");
        setExcursions(data.tours); // same as in your CardsGrid
      } catch (error) {
        console.error("Error fetching excursions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExcursions();
  }, []);

  return (
    <ExcursionContext
      value={{ excursions, setExcursions, loading, setLoading }}
    >
      {children}
    </ExcursionContext>
  );
};
