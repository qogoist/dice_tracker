import React from "react";
import { getRelativeTime } from "../helper/date";

import Card from "./Card";

type Props = {
  session: ISession;
};

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const SessionPreview: React.FC<Props> = ({ session }) => {
  return (
    <Card>
      <h1>{session.name}</h1>
      <small>{getRelativeTime(new Date(session.date))}</small>
    </Card>
  );
};

export default SessionPreview;
