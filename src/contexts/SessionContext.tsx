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
};

export const SessionContext = createContext<Partial<ISessionContext>>({});

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider: React.FC = ({ children }) => {
  const { currentUser } = useAuth();
  const [currSession, setCurrSession] = useState<ISession>();
  const [sessions, setSessions] = useState<ISession[]>([]);

  useEffect(() => {
    console.log(
      "Fetching state from local storage. This should only happen on first load or refresh!"
    );

    const sessionStateString = localStorage.getItem("currentSession");

    if (sessionStateString && sessionStateString !== "undefined") {
      const sessionState = JSON.parse(sessionStateString);

      initializeStats(sessionState);

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

    loadSessions.sort((a, b) => (a.date < b.date ? 1 : -1));

    setSessions(loadSessions);
  };

  const startSession = (state: ISession) => {
    state.stats = initializeStats(state);
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

  const initializeStats = (sessionState: ISession): IStats => {
    let stats: IStats = { ...sessionState.stats };

    //FUTURE: Sort this after most used.... maybe enable in settings

    stats.usedDice.sort((a: Dice, b: Dice) => sortDice(a, b, "desc"));

    for (const die of stats.usedDice) {
      stats = {
        ...stats,
        [die]: {
          rolls: 0,
          total: 0,
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
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
