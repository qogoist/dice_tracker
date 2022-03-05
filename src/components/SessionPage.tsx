import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

import Card from "./Card";
import DiceStatView from "./DiceStatView";

const SessionPage: React.FC = () => {
  const [session, setSession] = useState<ISession | null>(null);

  const { sessionId } = useParams();
  const { getSession } = useSession();

  useEffect(() => {
    if (getSession !== null) {
      const tempSession = getSession!(sessionId!);
      setSession(tempSession);
    }
  }, [getSession]);

  if (getSession === null) {
    return (
      <div className="session-stats-grid">
        <h1>Loading...</h1>
        <Card className="stats"></Card>
      </div>
    );
  }

  if (session != null) {
    return (
      <div className="session-stats-grid">
        <h1>{session.name}</h1>
        <Card className="stats">
          <DiceStatView stats={session.stats} />
        </Card>
      </div>
    );
  } else {
    return (
      <div className="card-fit">
        <h1>No session found with this id 😦</h1>
      </div>
    );
  }
};

export default SessionPage;
