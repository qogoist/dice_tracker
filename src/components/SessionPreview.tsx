import React from "react";
import { Link } from "react-router-dom";
import { getRelativeTime } from "../helper/date";

import Card from "./Card";

type Props = {
  session: ISession;
  className?: string;
  current?: boolean;
};

const SessionPreview: React.FC<Props> = ({ session, className, current }) => {
  return (
    <Card
      className={
        "session-preview" + (className ? ` ${className}` : "") + (current ? " current-session" : "")
      }
    >
      <h1>
        {current ? (
          <>
            Current: <Link to="/ongoing-session">{session.name}</Link>
          </>
        ) : (
          <Link to={"/sessions/" + session._id}>{session.name}</Link>
        )}
      </h1>
      <div className="spaced">
        <small>in {session.game}</small>
        <small>Rolls: {session.stats.rolls.length}</small>
        <small>{getRelativeTime(new Date(session.date))}</small>
      </div>
    </Card>
  );
};

export default SessionPreview;
