export const sortDice = (a: Dice, b: Dice, type: "asc" | "desc") => {
  const numA: number = parseInt(a.substring(1));
  const numB: number = parseInt(b.substring(1));

  if (type === "asc") return numA > numB ? 1 : -1;
  else return numA > numB ? -1 : 1;
};
