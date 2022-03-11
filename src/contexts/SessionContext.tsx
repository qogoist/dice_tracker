import React, { createContext, useContext, useEffect, useState } from "react";
import { QuerySnapshot } from "@firebase/firestore";
import { addSession, deleteSession, getAllSessions, updateSession } from "../api/session";
import { sortDice } from "../helper/sorting";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { AllDice } from "../helper/globals";

export type ISessionContext = {
  currSession: ISession | undefined;
  setCurrSession: (session: ISession | undefined) => void;
  sessions: ISession[];
  startSession: (state: ISession) => void;
  endSession: (session: ISession, edit?: boolean, cont?: boolean) => void;
  removeSession: (id: string) => Promise<void>;
  stopCurrentSession: () => void;
  addRoll: (roll: IRoll, session: ISession) => ISession;
  stats: IStats;
  getSession: ((id: string) => ISession | undefined) | null;
};

export const SessionContext = createContext<ISessionContext | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);

  if (context === undefined) throw new Error("Context not defined");

  return context;
};

export const SessionProvider: React.FC = ({ children }) => {
  const { currentUser } = useAuth();
  const [currSession, setCurrSession] = useState<ISession>();
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [stats, setStats] = useState<IStats>(() => {
    return initializeStats({
      rolls: [],
      usedDice: AllDice,
    });
  });

  const navigate = useNavigate();

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
      usedDice: AllDice,
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
    setCurrSession(state);
    navigate("/ongoing-session");
  };

  const endSession = (session: ISession, edit: boolean = false, cont: boolean = false) => {
    if (edit) {
      if (cont) {
        navigate("/continue-session", { state: session });
        return;
      }
      updateSession(currentUser, session);
      navigate("/");
      return;
    }

    try {
      addSession(currentUser, currSession);
      setCurrSession(undefined);
      localStorage.removeItem("currentSession");
      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  const removeSession = async (id: string) => {
    try {
      await deleteSession(currentUser, id);
    } catch (error: any) {
      console.log(error);
    }
  };

  const stopCurrentSession = () => {
    setCurrSession(undefined);
    localStorage.removeItem("currentSession");
  };

  const addRoll = (roll: IRoll, session: ISession): ISession => {
    let newState: ISession = { ...session! };

    newState.stats.rolls.push(roll);

    const newStats: IStats = { ...session.stats };

    newStats[roll.die].rolls += 1;

    if (newStats[roll.die].total.length == 0) newStats[roll.die].total.push(roll.result);
    else newStats[roll.die].total.push(newStats[roll.die].total.at(-1) + roll.result);

    newStats[roll.die].avg.push(newStats[roll.die].total.at(-1) / newStats[roll.die].rolls);
    newStats[roll.die].history.push(newState.stats.rolls[newState.stats.rolls.length - 1]);

    newState.stats = newStats;

    return newState;
  };

  function initializeStats(localStats: IStats): IStats {
    for (const die of AllDice) {
      const isUsed = localStats.usedDice.includes(die);
      const exists = localStats[die];

      if (isUsed && !exists) {
        localStats = {
          ...localStats,
          [die]: {
            rolls: 0,
            total: [],
            avg: [],
            history: [],
          },
        };
      } else if (exists && !isUsed) {
        delete localStats[die];
      }
    }

    localStats.usedDice.sort((a: Dice, b: Dice) => sortDice(a, b, "desc"));

    return localStats;
  }

  let getSession = null;

  if (sessions.length > 0) {
    getSession = (id: string): ISession | undefined => {
      let value = undefined;

      console.log("Fetching Session: " + id);
      console.log(sessions);

      sessions.forEach(session => {
        if (session._id === id) {
          value = session;
        }
      });

      console.log(value);

      return value;
    };
  }

  const value: ISessionContext = {
    currSession,
    setCurrSession,
    sessions,
    startSession,
    endSession,
    removeSession,
    stopCurrentSession,
    addRoll,
    stats,
    getSession,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
