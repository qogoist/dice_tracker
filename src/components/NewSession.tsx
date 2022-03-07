import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import DicePicker from "./DicePicker";
import FormLabel from "./FormLabel";

import { useSession } from "../contexts/SessionContext";
import { getLocalISOString } from "../helper/date";
import AlertBox from "./AlertBox";

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
  const navigate = useNavigate();
  const { startSession, endSession } = useSession();
  const formRef = useRef<HTMLFormElement>(null);
  const { state } = useLocation();

  useEffect(() => {
    if (state) setData(state);
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
      endSession?.(data); //TODO: On edit of ongoing session this should not end :)
      navigate(-1);
      return;
    }

    try {
      startSession?.(data);
      navigate("/ongoing-session");
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

  const handleDice = (die: Dice, checked: boolean) => {
    const dice = { ...data.stats };

    console.log("Handling ", die, checked);
    console.log(dice.usedDice);

    if (checked && !dice.usedDice.includes(die)) dice.usedDice.push(die);
    else if (!checked && dice.usedDice.includes(die))
      dice.usedDice.splice(dice.usedDice.indexOf(die), 1);

    console.log(dice.usedDice);
    setData({
      ...data,
      stats: dice,
    });
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
    </div>
  );
};

export default NewSession;
