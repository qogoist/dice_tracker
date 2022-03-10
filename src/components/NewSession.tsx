import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

import DicePicker from "./DicePicker";
import FormLabel from "./FormLabel";

import { useSession } from "../contexts/SessionContext";
import { getLocalISOString } from "../helper/date";
import AlertBox from "./AlertBox";
import DeleteModal from "./DeleteModal";

const NewSession: React.FC = () => {
  const [data, setData] = useState<ISession>({
    name: "",
    game: "",
    date: getLocalISOString().substring(0, 16),
    stats: {
      rolls: [],
      usedDice: [],
    },
  });
  const [err, setErr] = useState<boolean>(false);
  const [modal, setModal] = useState(false);
  const [modalPromise, setModalPromise] = useState<{ resolve?: any; reject?: any; die?: Dice }>({});

  const formRef = useRef<HTMLFormElement>(null);

  const { startSession, endSession } = useSession();
  const { state } = useLocation();

  useEffect(() => {
    if (state) setData(state.session);
  }, [state]);

  useEffect(() => {
    if (data.stats.usedDice.length > 0) setErr(false);
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.stats.usedDice.length < 1) {
      setErr(true);
      console.log("No dice selected");
      return;
    }

    if (state) {
      if (state.edit) endSession?.(data, state.edit, state.cont);
      else startSession?.(data);
      return;
    }

    try {
      startSession?.(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const key: keyof ISession = e.currentTarget.name as keyof ISession;
    const value = e.currentTarget.value;

    setData({
      ...data,
      [key]: value,
    });
  };

  const modalClose = async (die: Dice) => {
    return new Promise((resolve, reject) => {
      console.log("Promise and whatnot.");
      setModalPromise({ resolve, reject, die });
    });
  };

  const handleDice = async (die: Dice, checked: boolean) => {
    const dice = { ...data.stats };

    if (checked && !dice.usedDice.includes(die)) {
      addDie(die, dice);
    } else if (!checked && dice.usedDice.includes(die)) {
      if (dice[die].rolls > 0) {
        setModal(true);
        const value = await modalClose(die);
        return value;
      }

      deleteDie(die, dice);
    }

    return true;
  };

  const addDie = (die: Dice, stats: IStats) => {
    stats.usedDice.push(die);
    stats[die] = {
      rolls: 0,
      total: [],
      avg: [],
      history: [],
    };

    setData({
      ...data,
      stats: stats,
    });
  };

  const deleteDie = (die: Dice, stats: IStats) => {
    stats.usedDice.splice(stats.usedDice.indexOf(die), 1);
    delete stats[die];

    setData({
      ...data,
      stats: stats,
    });
  };

  const deleteAbort = () => {
    console.log("Aborting deletion");
    modalPromise.resolve(false);
    setModal(false);
  };

  const deleteConfirm = () => {
    console.log("Confirming deletion");
    deleteDie(modalPromise.die!, { ...data.stats });

    modalPromise.resolve(true);
    setModal(false);
  };

  return (
    <div className="content">
      <div className="card">
        <h1 className="card-heading">New Session</h1>
        <form ref={formRef} onSubmit={handleSubmit} className="new-session-form">
          <FormLabel
            description="Name"
            name="name"
            type="text"
            handleChange={handleChange}
            isRequired={true}
            value={data.name}
          />
          <FormLabel
            description="Game"
            name="game"
            type="text"
            handleChange={handleChange}
            isRequired={true}
            value={data.game}
          />
          <FormLabel
            description="Date"
            name="date"
            type="datetime-local"
            value={data.date}
            handleChange={handleChange}
          />
          <h2>Choose Dice:</h2>
          <AlertBox type="error" active={err} message="Please select at least one type of die." />
          <DicePicker handleChange={handleDice} checkedDice={data.stats.usedDice} />
          {state ? (
            <button type="submit" className="btn new-session-btn">
              Save Info
            </button>
          ) : (
            <button type="submit" className="btn new-session-btn">
              Start Session
            </button>
          )}
        </form>
      </div>

      <DeleteModal
        show={modal}
        message="You are about to delete a die that has already been rolled. Do you wish to proceed?"
        type="Deleting Data"
        onClose={deleteAbort}
        onDelete={deleteConfirm}
      />
    </div>
  );
};

export default NewSession;
