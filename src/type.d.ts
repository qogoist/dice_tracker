interface ISession {
  _id?: string;
  name: string;
  game: string;
  date: string;
  stats: IStats;
}

interface IRoll {
  die: Dice;
  result: number;
}

interface IDieStats {
  rolls: number;
  total: number[];
  avg: number[];
  history: IRoll[]; //Reference to the location in the IStats.rolls array.
}

interface IStats {
  [die: string]: IDieStats | any;

  rolls: IRoll[];
  usedDice: Dice[];
}

type Dice = "D4" | "D6" | "D8" | "D10" | "D12" | "D20" | "D100";
type DiceSortMethods = "asc" | "desc";

type SessionSortMethods =
  | "latest"
  | "oldest"
  | "az-name"
  | "za-name"
  | "az-game"
  | "za-game"
  | "rolls-asc"
  | "rolls-desc";

type Settings = {
  preferredDice: Dice[];
  diceSort: DiceSortMethods;
  sessionSort: SessionSortMethods;
};
