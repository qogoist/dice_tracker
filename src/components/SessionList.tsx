import React from "react";
import { Link } from "react-router-dom";

import { useSession } from "../contexts/SessionContext";
import SessionPreview from "./SessionPreview";

const SessionList: React.FC = () => {
  const { sessions } = useSession();

  return (
    <div className="session-list">
      {!sessions || sessions.length === 0 ? (
        <>
          <h1 className="floating-text">No sessions logged yet.</h1>
          <p className="floating-text">
            Start by creating a <Link to="/new-session">new session.</Link>
          </p>
        </>
      ) : (
        sessions?.map(session => <SessionPreview key={session._id} session={session} />)
      )}
    </div>
  );
};

export default SessionList;
