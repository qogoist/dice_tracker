import React from "react";
import { useSession } from "../contexts/SessionContext";

import Card from "./Card";
import SessionList from "./SessionList";
import DiceStatView from "./DiceStatView";
import SessionPreview from "./SessionPreview";

const Dashboard: React.FC = () => {
  const { stats, currSession } = useSession();

  return (
    <div className="dashboard content">
      {currSession && <SessionPreview current={true} session={currSession} />}
      <Card className="stats">
        <DiceStatView stats={stats!} />
      </Card>
      <SessionList />
    </div>
  );
};

export default Dashboard;
