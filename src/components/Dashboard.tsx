import React from "react";
import { useSession } from "../contexts/SessionContext";

import Card from "./Card";
import SessionList from "./SessionList";
import DiceStatView from "./DiceStatView";
import SessionPreview from "./SessionPreview";
import { Link } from "react-router-dom";
import Divider from "./Divider";

const Dashboard: React.FC = () => {
  const { stats, currSession } = useSession();

  return (
    <div className="dashboard content">
      {currSession ? (
        <SessionPreview current={true} session={currSession} />
      ) : (
        <p className="floating-text current-replacer">
          There is no ongoing session. Do you want to{" "}
          <Link to="/new-session">start a new session?</Link>
        </p>
      )}
      <Card className="stats">
        <DiceStatView stats={stats!} />
      </Card>
      <SessionList />
      <Divider />
    </div>
  );
};

export default Dashboard;
