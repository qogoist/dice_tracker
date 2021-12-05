import React, { createContext, useContext, useEffect, useState } from "react";
import { QuerySnapshot } from "@firebase/firestore";
import { addSession, getAllSessions } from "../api/session";
import { sortDice } from "../helper/sortDice";
import { useAuth } from "./AuthContext";

export type ISessionContext = {
  currSession: ISession | undefined;
  sessions: ISession[];
  startSession: (state: ISession) => void;
  endSession: () => void;
  addRoll: (roll: IRoll) => void;
  stats: IStats;
};

export const SessionContext = createContext<Partial<ISessionContext>>({});

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider: React.FC = ({ children }) => {
  const { currentUser } = useAuth();
  const [currSession, setCurrSession] = useState<ISession>();
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [stats, setStats] = useState<IStats>(() => {
    return initializeStats({
      rolls: [],
      usedDice: ["D4", "D6", "D8", "D10", "D12", "D20", "D100"],
    });
  });

  useEffect(() => {
    console.log(
      "Fetching state from local storage. This should only happen on first load or refresh!"
    );

    const sessionStateString = localStorage.getItem("currentSession");

    if (sessionStateString && sessionStateString !== "undefined") {
      const sessionState = JSON.parse(sessionStateString);

      setCurrSession(sessionState);
    } else console.log("No state could be fetched.");

    const unsubscribe = getAllSessions(currentUser, sessionsObserver);

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currSession) {
      // console.log("Saving current session to local storage.");
      // console.log(currSession);
      localStorage.setItem("currentSession", JSON.stringify(currSession));
    }
  }, [currSession]);

  const sessionsObserver = (snapshot: QuerySnapshot) => {
    console.log("Updating Sessions ", new Date().toISOString());

    let loadSessions: ISession[] = [];

    snapshot.forEach(doc => {
      let newData: ISession = { ...(doc.data() as ISession) };
      newData._id = doc.id;

      loadSessions.push(newData);
    });

    loadSessions.sort((a, b) => (a.date < b.date ? -1 : 1));

    let stats = initializeStats({
      rolls: [],
      usedDice: ["D4", "D6", "D8", "D10", "D12", "D20", "D100"],
    });

    loadSessions.forEach(data => {
      concatSessionStats(stats, data.stats);
    });

    setStats(stats);

    loadSessions.sort((a, b) => (a.date < b.date ? 1 : -1));

    setSessions(loadSessions);
  };

  const concatSessionStats = (globalStats: IStats, sessionStats: IStats) => {
    globalStats.rolls = globalStats.rolls.concat(sessionStats.rolls);

    for (const die of sessionStats.usedDice) {
      let sessionDieStats: IDieStats = sessionStats[die];

      globalStats[die].rolls += sessionDieStats.rolls;
      globalStats[die].history = globalStats[die].history.concat(sessionDieStats.history);

      const length = globalStats[die].total.length;
      const base = length > 0 ? globalStats[die].total.at(-1) : 0;

      sessionDieStats.total.forEach((num: number, i: number) => {
        globalStats[die].total.push(base + num);
        globalStats[die].avg.push((base + num) / (length + i + 1));
      });
    }
  };

  const startSession = (state: ISession) => {
    state.stats = initializeStats(state.stats);
    setCurrSession(state);
  };

  const endSession = () => {
    try {
      addSession(currentUser, currSession);
      setCurrSession(undefined);
      localStorage.removeItem("currentSession");
    } catch (error: any) {
      console.log(error);
    }
  };

  const addRoll = (roll: IRoll) => {
    let newState: ISession = { ...currSession! };

    if (currSession) {
      newState.stats.rolls.push(roll);

      const newStats: IStats = { ...currSession.stats };

      newStats[roll.die].rolls += 1;

      if (newStats[roll.die].total.length == 0) newStats[roll.die].total.push(roll.result);
      else newStats[roll.die].total.push(newStats[roll.die].total.at(-1) + roll.result);

      newStats[roll.die].avg.push(newStats[roll.die].total.at(-1) / newStats[roll.die].rolls);
      newStats[roll.die].history.push(newState.stats.rolls[newState.stats.rolls.length - 1]);

      newState.stats = newStats;

      setCurrSession(newState);
    } else console.log("No session state found => Something went wrong.");
  };

  function initializeStats(stats: IStats): IStats {
    //FUTURE: Sort this after most used.... maybe enable in settings

    stats.usedDice.sort((a: Dice, b: Dice) => sortDice(a, b, "desc"));

    for (const die of stats.usedDice) {
      stats = {
        ...stats,
        [die]: {
          rolls: 0,
          total: [],
          avg: [],
          history: [],
        },
      };
    }

    return stats;
  }

  const value: ISessionContext = {
    currSession,
    sessions,
    startSession,
    endSession,
    addRoll,
    stats,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
