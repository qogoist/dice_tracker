import React, { useState } from "react";
import { useNavigate } from "react-router";

import { useSession } from "../contexts/SessionContext";

import Button from "./Button";
import Card from "./Card";
import DiceModal from "./DiceModal";
import DynDicePicker from "./DynDicePicker";
import DiceStatView from "./DiceStatView";

const OngoingSession: React.FC = () => {
  const { currSession, addRoll, endSession } = useSession();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeDie, setActiveDie] = useState<number>(0);

  const handleDiceButton = (e: React.FormEvent) => {
    const die: number = parseInt(e.currentTarget.innerHTML.substring(1));

    setActiveDie(die);
    setShowModal(true);
  };

  const handleLogDie = (e: React.FormEvent) => {
    const num: number = parseInt(e.currentTarget.innerHTML);

    const roll: IRoll = {
      die: `D${activeDie}` as Dice,
      result: num,
    };

    addRoll?.(roll);
    setShowModal(false);
  };

  const handleEndSession = () => {
    console.log("Ending Session");
    endSession?.();
    navigate("..");
  };

  if (currSession) {
    return (
      <div className="session-grid content">
        <h1>{currSession.name}</h1>
        <Button className="btn" onClick={handleEndSession}>
          End Session
        </Button>
        <Card className="stats">
          <DiceStatView stats={currSession.stats} />
        </Card>
        <Card className="dice-picker">
          <DynDicePicker handleChange={handleDiceButton} dice={currSession.stats.usedDice} />
        </Card>

        <DiceModal
          die={activeDie}
          show={showModal}
          handleClose={() => setShowModal(false)}
          hndClick={handleLogDie}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default OngoingSession;
