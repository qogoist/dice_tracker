import React from "react";

import Card from "./Card";

type Props = {
  session: ISession;
};

const SessionSummary: React.FC<Props> = ({ session }) => {
  return (
    <Card>
      <h1>{session.name}</h1>
    </Card>
  );
};

export default SessionSummary;
