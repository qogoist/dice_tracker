import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import DicePicker from "./DicePicker";
import FormLabel from "./FormLabel";

import { useSession } from "../contexts/SessionContext";
import { getLocalISOString } from "../helper/date";
import Button from "./Button";
import AlertBox from "./AlertBox";

const NewSession: React.FC = () => {
  const [data, setData] = useState<ISession>({
    name: "",
    game: "",
    date: getLocalISOString().substr(0, 16),
    stats: {
      rolls: [],
      usedDice: [],
    },
  });
  const [err, setErr] = useState<boolean>(false);
  const navigate= useNavigate();
  const { startSession } = useSession();
  const formRef = useRef<HTMLFormElement>(null);

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

    try {
      startSession?.(data);
      navigate("../ongoing-session");
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

    if (checked) dice.usedDice.push(die);
    else if (dice.usedDice.includes(die)) dice.usedDice.splice(dice.usedDice.indexOf(die), 1);

    setData({
      ...data,
      stats: dice,
    });
  };

  return (
    <div className="session-box">
      <div className="card">
        <h1 className="card-heading">New Session</h1>
        <form ref={formRef} onSubmit={handleSubmit} className="new-session-form">
          <FormLabel
            description="Name"
            name="name"
            type="text"
            handleChange={handleChange}
            isRequired={true}
          />
          <FormLabel
            description="Game"
            name="game"
            type="text"
            handleChange={handleChange}
            isRequired={true}
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
          <DicePicker handleChange={handleDice} />
          <Button
            className="btn new-session-btn"
            onClick={() => {
              formRef.current?.requestSubmit();
            }}
          >
            Start Session
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewSession;
