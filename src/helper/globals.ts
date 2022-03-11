export const AllDice: Dice[] = ["D4", "D6", "D8", "D10", "D12", "D20", "D100"];

export const DiceSortMethods: DiceSortMethods[] = ["asc", "desc"];

export const DiceSortMethodMap = {
  asc: "Ascending",
  desc: "Descending",
};

export const SessionSortMethods: SessionSortMethods[] = [
  "latest",
  "oldest",
  "az-name",
  "za-name",
  "az-game",
  "za-game",
  "rolls-asc",
  "rolls-desc",
];

export const SessionSortMethodsMap = {
  latest: "Date - Latest First",
  oldest: "Date - Oldest First",
  "az-name": "Name - Ascending",
  "za-name": "Name - Descending",
  "az-game": "Game - Ascending",
  "za-game": "Game - Descending",
  "rolls-asc": "Rolls - Ascending",
  "rolls-desc": "Rolls - Descending",
};
