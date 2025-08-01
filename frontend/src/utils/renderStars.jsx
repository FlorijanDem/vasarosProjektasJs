export const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  return (
    <>
      {"★".repeat(fullStars)}
      {hasHalfStar && "⯪"}
      {"☆".repeat(totalStars - fullStars - (hasHalfStar ? 1 : 0))}
    </>
  );
};
