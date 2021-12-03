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
  const [stats, setStats] = useState<IStats>({
    rolls: [],
    usedDice: ["D4", "D6", "D8", "D10", "D12", "D20", "D100"],
  });
  const [statsInitialized, setStatsInitialized] = useState<boolean>(false);

  useEffect(() => {
    setStats(initializeStats(stats));
    setStatsInitialized(true);
  }, []);

  useEffect(() => {
    if (!statsInitialized) return;

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
  }, [statsInitialized]);

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

    loadSessions.forEach(data => {
      addSessionStats(data.stats);
    });

    loadSessions.sort((a, b) => (a.date < b.date ? 1 : -1));

    setSessions(loadSessions);
  };

  const addSessionStats = (sessionStats: IStats) => {
    let globalStats = stats;

    globalStats.rolls.concat(sessionStats.rolls);

    for (const die of sessionStats.usedDice) {
      globalStats[die].rolls += sessionStats[die].rolls;
      globalStats[die].total += sessionStats[die].total;
      globalStats[die].history = globalStats[die].history.concat(sessionStats[die].history);

      // URGENT: Fix avg calculation
      globalStats[die].avg = globalStats[die].avg.concat(sessionStats[die].avg);
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

  const initializeStats = (stats: IStats): IStats => {
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
  };

  const addRoll = (roll: IRoll) => {
    let newState: ISession = { ...currSession! };

    if (currSession) {
      newState.stats.rolls.push(roll);

      const newStats: IStats = { ...currSession.stats };

      newStats[roll.die].rolls += 1;
      newStats[roll.die].total += roll.result;
      newStats[roll.die].avg.push(newStats[roll.die].total / newStats[roll.die].rolls);
      newStats[roll.die].history.push(newState.stats.rolls[newState.stats.rolls.length - 1]);

      newState.stats = newStats;

      setCurrSession(newState);
    } else console.log("No session state found => Something went wrong.");
  };

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
