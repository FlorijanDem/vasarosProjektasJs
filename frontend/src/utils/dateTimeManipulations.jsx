export const getClosestDate = (dates) => {
  if (!dates?.length) return null;
  const now = new Date();
  return dates
    .map((d) => new Date(d))
    .filter((d) => d >= now)
    .sort((a, b) => a - b)[0];
};

export const formatInterval = (interval) => {
  const [hours, minutes] = interval.split(":");
  const h = parseInt(hours, 10);
  const m = parseInt(minutes, 10);

  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
};

