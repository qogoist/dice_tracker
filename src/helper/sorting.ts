export const sortDice = (a: Dice | "Overview", b: Dice | "Overview", type: DiceSortMethods) => {
  if (a === "Overview") return -1;
  if (b === "Overview") return 1;

  const numA: number = parseInt(a.substring(1));
  const numB: number = parseInt(b.substring(1));

  if (type === "asc") return numA > numB ? 1 : -1;
  else return numA > numB ? -1 : 1;
};

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

export const sortSessions = (a: ISession, b: ISession, type: SessionSortMethods): number => {
  console.log(type);

  switch (type) {
    case "latest":
      return a.date > b.date ? -1 : 1;
    case "oldest":
      return a.date > b.date ? 1 : -1;

    case "az-name":
      return collator.compare(a.name, b.name);
    case "za-name":
      return collator.compare(b.name, a.name);

    case "az-game":
      return collator.compare(a.game, b.game);
    case "za-game":
      return collator.compare(b.game, a.game);

    case "rolls-asc":
      return a.stats.rolls > b.stats.rolls ? 1 : -1;
    case "rolls-desc":
      return a.stats.rolls > b.stats.rolls ? -1 : 1;

    default:
      return 0;
  }
};
