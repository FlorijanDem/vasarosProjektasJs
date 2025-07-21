import styles from "./cardsGrid.module.css";
import ExcursionCard from "../ExcursionCard/ExcursionCard";

// This object will be deleted after backend is plugged in.
const excursions = [
  {
    id: 1,
    image: "https://walkablevilnius.com/content/uploads/1_3.jpg",
    title: "Vilnius Old Town Tour",
    rating: 4,
    closestDate: "8/1/2025",
    duration: "3",
    price: 36,
  },
  {
    id: 2,
    image:
      "https://www.toptravelsights.com/wp-content/uploads/2020/10/Vilnius-Town-Hall-Square.jpg",
    title: "Trakai Castle Excursion",
    rating: 4.5,
    closestDate: "8/3/2025",
    duration: "5",
    price: 42,
  },
  {
    id: 3,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/ba/cc/f3/caption.jpg?w=800&h=800&s=1",
    title: "Bohemian Užupis Walk",
    rating: 4.2,
    closestDate: "8/5/2025",
    duration: "2",
    price: 20,
  },
  {
    id: 4,
    image: "https://walkablevilnius.com/content/uploads/1_5-1443x1080.jpg",
    title: "Gediminas Tower Climb",
    rating: 4.6,
    closestDate: "8/4/2025",
    duration: "1.5",
    price: 18,
  },
  {
    id: 5,
    image:
      "https://www.nordicexperience.com/wp-content/uploads/2018/03/AdobeStock_96218692.jpeg",
    title:
      "Modern Vilnius & City Center Modern Vilnius & City Center Modern Vilnius & City Center",
    rating: 4.3,
    closestDate: "8/2/2025",
    duration: "3",
    price: 28,
  },
  {
    id: 6,
    image: "https://walkablevilnius.com/content/uploads/1_5-1443x1080.jpg",
    title: "Gediminas Tower Climb",
    rating: 4.6,
    closestDate: "8/4/2025",
    duration: "1.5",
    price: 18,
  },
  {
    id: 7,
    image:
      "https://www.nordicexperience.com/wp-content/uploads/2018/03/AdobeStock_96218692.jpeg",
    title: "Modern Vilnius & City Center",
    rating: 4.3,
    closestDate: "8/2/2025",
    duration: "3",
    price: 28,
  },
  {
    id: 8,
    image: "https://walkablevilnius.com/content/uploads/1_5-1443x1080.jpg",
    title: "Gediminas Tower Climb",
    rating: 4.6,
    closestDate: "8/4/2025",
    duration: 3,
    price: 18,
  },
  {
    id: 9,
    image:
      "https://www.nordicexperience.com/wp-content/uploads/2018/03/AdobeStock_96218692.jpeg",
    title: "Modern Vilnius & City Center",
    rating: 4.3,
    closestDate: "8/2/2025",
    duration: 3,
    price: 28,
  },
  {
    id: 10,
    image: "https://walkablevilnius.com/content/uploads/1_5-1443x1080.jpg",
    title: "Gediminas Tower Climb",
    rating: 4.6,
    closestDate: "8/4/2025",
    duration: 3,
    price: 18,
  },
  {
    id: 11,
    image:
      "https://www.nordicexperience.com/wp-content/uploads/2018/03/AdobeStock_96218692.jpeg",
    title: "Modern Vilnius & City Center",
    rating: 4.3,
    closestDate: "8/2/2025",
    duration: 3,
    price: 28,
  },
];

const CardsGrid = () => {
  return (
    <section className={styles.grid}>
      {excursions.map((exc) => (
        <ExcursionCard key={exc.id} excursion={exc} />
      ))}
    </section>
  );
};

export default CardsGrid;
