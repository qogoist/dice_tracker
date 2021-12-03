import React from "react";

import { useSession } from "../contexts/SessionContext";
import SessionSummary from "./SessionSummary";

const SessionList: React.FC = () => {
  const { sessions } = useSession();
  return (
    <div className="session-list">
      {sessions?.map(session => (
        <SessionSummary key={session._id} session={session} />
      ))}
    </div>
  );
};

export default SessionList;
