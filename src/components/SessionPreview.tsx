import React from "react";
import { Link } from "react-router-dom";
import { getRelativeTime } from "../helper/date";

import Card from "./Card";

type Props = {
  session: ISession;
};

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const SessionPreview: React.FC<Props> = ({ session }) => {
  return (
    <Card>
      <h1>
        <Link to={"/sessions/" + session._id}>{session.name}</Link>
      </h1>
      <div className="full-width spaced">
        <small>{session.game}</small>
        <small>{getRelativeTime(new Date(session.date))}</small>
      </div>
    </Card>
  );
};

export default SessionPreview;
