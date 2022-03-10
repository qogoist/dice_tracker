import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { useSession } from "../contexts/SessionContext";

import Button from "./Button";
import Card from "./Card";
import DiceModal from "./DiceModal";
import DynDicePicker from "./DynDicePicker";
import DiceStatView from "./DiceStatView";
import { MdEdit } from "react-icons/md";

const OngoingSession: React.FC = () => {
  const { currSession, setCurrSession, addRoll, endSession } = useSession();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeDie, setActiveDie] = useState<number>(0);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [session, setSession] = useState<ISession | undefined>();

  useEffect(() => {
    if (!session) {
      if (!state && currSession) setSession(currSession);
      if (state) setSession(state);
    } else if (!state) {
      setCurrSession!(session);
    }
  }, [state, currSession, session]);

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

    setSession(addRoll?.(roll, session!));

    setShowModal(false);
  };

  const handleEndSession = () => {
    endSession?.(session!);
  };

  const handleEdit = () => {
    navigate("/edit-session", {
      state: {
        session: session,
        edit: state ? true : false,
        cont: state ? true : false,
      },
    });
  };

  if (session) {
    return (
      <div className="session-grid content">
        <h1>{session.name}</h1>
        <div className="buttons">
          <button className="btn btn-neutral icon" title="Edit Session Info" onClick={handleEdit}>
            <MdEdit />
          </button>
          <Button className="btn" onClick={handleEndSession}>
            End Session
          </Button>
        </div>
        <Card className="stats">
          <DiceStatView stats={session.stats} />
        </Card>
        <Card className="dice-picker">
          <DynDicePicker handleChange={handleDiceButton} dice={session.stats.usedDice} />
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
