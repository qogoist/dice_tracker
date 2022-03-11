export const sortDice = (a: Dice | "Overview", b: Dice | "Overview", type: DiceSortMethods) => {
  if (a === "Overview") return -1;
  if (b === "Overview") return 1;

  const numA: number = parseInt(a.substring(1));
  const numB: number = parseInt(b.substring(1));

  if (type === "asc") return numA > numB ? 1 : -1;
  else return numA > numB ? -1 : 1;
};
