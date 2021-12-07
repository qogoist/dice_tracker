import React from "react";

import { useSession } from "../contexts/SessionContext";
import SessionPreview from "./SessionPreview";

const SessionList: React.FC = () => {
  const { sessions } = useSession();
  return (
    <div className="session-list">
      {sessions?.map(session => (
        <SessionPreview key={session._id} session={session} />
      ))}
    </div>
  );
};

export default SessionList;
