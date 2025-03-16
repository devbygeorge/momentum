export const getRandomColor = (colors: string[]) => {
  if (!colors.length) throw new Error("Colors array cannot be empty");
  return colors[Math.floor(Math.random() * colors.length)];
};
