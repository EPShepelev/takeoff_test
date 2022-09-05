export const generateRandomId = (min: number, max: number) => {
  const date = Number(new Date());
  return date + Math.floor(Math.random() * (max - min + 1)) + min;
};
