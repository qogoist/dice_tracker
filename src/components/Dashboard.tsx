import React from "react";
import { useSession } from "../contexts/SessionContext";

import Card from "./Card";
import SessionList from "./SessionList";
import SessionStats from "./SessionStats";

const Dashboard: React.FC = () => {
  const { stats } = useSession();

  return (
    <div className="dashboard content">
      <Card className="stats">
        <SessionStats stats={stats!} />
      </Card>
      <SessionList />
    </div>
  );
};

export default Dashboard;
