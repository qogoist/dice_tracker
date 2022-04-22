import { stringify } from "@firebase/util";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSettings } from "../contexts/SettingsContext";
import { mapAuthErrorMessage } from "../helper/AuthErrorMessage";
import AlertBox from "./AlertBox";
import AuthModal from "./AuthModal";
import Card from "./Card";
import DangerModal from "./DangerModal";
import DicePicker from "./DicePicker";
import Divider from "./Divider";
import FormLabel from "./FormLabel";
import SortPicker from "./SortPicker";

type Danger = {
  type: "Delete Account" | "Reset Data";
  message: string;
};

const Settings: React.FC = () => {
  const { settings, saveSettings } = useSettings();
  const { resetData, deleteAccount, changePassword } = useAuth();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saving, setSaving] = useState<boolean>(false);
  const [danger, setDanger] = useState<Danger | undefined>(undefined);
  const [authenticate, setAuthenticate] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [passError, setPassError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [modalPromise, setModalPromise] = useState<{ resolve?: any; reject?: any }>({});
  const [newPass, setNewPass] = useState<{
    "new-password": string;
    "confirm-new-password": string;
  }>({ "new-password": "", "confirm-new-password": "" });

  const navigate = useNavigate();

  const handleDice = (die: Dice, checked: boolean) => {
    if (!localSettings || !settings) return false;

    let dice = [...localSettings.preferredDice];

    if (checked) dice.push(die);
    else dice.splice(dice.indexOf(die), 1);

    setLocalSettings({
      ...localSettings,
      preferredDice: dice,
    });

    return true;
  };

  const handleDiceSort = (sort: React.FormEvent<HTMLSelectElement>) => {
    const value = sort.currentTarget.value as DiceSortMethods;

    console.log("Sort Method changed: ", value);

    setLocalSettings({
      ...localSettings,
      diceSort: value,
    });
  };

  const handleSessionSort = (sort: React.FormEvent<HTMLSelectElement>) => {
    const value = sort.currentTarget.value as SessionSortMethods;

    console.log("Sort Method changed: ", value);

    setLocalSettings({
      ...localSettings,
      sessionSort: value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await saveSettings?.(localSettings!);

      setSaving(false);
      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setDanger({
      type: "Reset Data",
      message:
        "You are about to reset your data. This will permanently delete all saved sessions and cannot be undone. Do you want to proceed?",
    });
  };

  const confirmDelete = () => {
    console.log("Confirming", danger?.type);

    if (!danger) return;

    if (danger.type === "Reset Data") resetData();

    setDanger(undefined);
  };

  const handleDeleteSubmit = async () => {
    setAuthenticate(true);
    const value = await modalClose();

    console.log("Promise", value);

    if (value) {
      try {
        await deleteAccount(value);
      } catch (error: any) {
        setError(mapAuthErrorMessage(error.code));
      }
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const cred = { email: data.get("email") as string, password: data.get("password") as string };

    modalPromise.resolve(cred);
  };

  const handleAuthAbort = async () => {
    setAuthenticate(false);
    setError("");
    modalPromise.resolve(false);
  };

  const handlePassChange = (e: React.FormEvent<HTMLInputElement>) => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;

    setNewPass({
      ...newPass,
      [key]: value,
    });
  };

  const modalClose = async (): Promise<{ email: string; password: string }> => {
    return new Promise((resolve, reject) => {
      console.log("Promise and whatnot.");
      setModalPromise({ resolve, reject });
    });
  };

  const handlePassSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPass["confirm-new-password"] !== newPass["new-password"])
      return setPassError("Passwords do not match.");

    setAuthenticate(true);
    const value = await modalClose();

    try {
      changePassword(value, newPass["new-password"]);
      setSuccess("Password successfully changed.");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="settings content">
      <h1 className="floating-text">Settings</h1>

      <Card
        className="full-width"
        title="Select dice that should always be checked for new sessions."
      >
        <h2>Preferred Dice</h2>
        <DicePicker
          handleChange={handleDice}
          checkedDice={settings?.preferredDice ? settings.preferredDice : undefined}
        />
      </Card>

      <Card className="full-width" title="Select your preferred method of sorting your dice.">
        <h2>Dice Sorting Method</h2>
        <SortPicker type="dice" handleChange={handleDiceSort} active={settings.diceSort} />
      </Card>

      <Card className="full-width" title="Select your preferred method of sorting your session.">
        <h2>Session Sorting Method</h2>
        <SortPicker
          type="sessions"
          handleChange={handleSessionSort}
          active={settings.sessionSort}
        />
      </Card>

      <button className="btn full-width" onClick={handleSave}>
        {saving ? "Saving..." : "Save Settings"}
      </button>

      <Divider />

      <h1 className="floating-text">Account Settings</h1>

      <Card className="full-width">
        <h2>Change Password</h2>
        <form onSubmit={handlePassSubmit} className="auth-form">
          <AlertBox active={passError ? true : false} type="error" message={passError} />
          <AlertBox active={success ? true : false} type="success" message={success} />
          <FormLabel
            description="New Password"
            name="new-password"
            type="password"
            isRequired={true}
            handleChange={handlePassChange}
          />
          <FormLabel
            description="Confirm Password"
            name="confirm-new-password"
            type="password"
            isRequired={true}
            handleChange={handlePassChange}
          />
          <button type="submit" className="btn">
            Confirm
          </button>
        </form>
      </Card>

      <Card className="full-width">
        <h2>Danger Zone</h2>
        <div className="equal-buttons">
          <button
            className="btn btn-danger"
            title="Permanently delete your account."
            onClick={handleDeleteSubmit}
          >
            Delete Account
          </button>
          <button
            className="btn-outline btn-danger"
            title="This will delete all saved sessions."
            onClick={handleReset}
          >
            Reset Data
          </button>
        </div>
      </Card>

      <DangerModal
        message={danger ? danger.message : ""}
        type={danger ? danger.type : ""}
        btn="Proceed"
        show={danger ? true : false}
        onClose={() => setDanger(undefined)}
        onDelete={confirmDelete}
      />

      <AuthModal
        show={authenticate}
        error={error}
        onClose={handleAuthAbort}
        onChange={() => {
          return;
        }}
        onSubmit={handleAuthSubmit}
      />
    </div>
  );
};

export default Settings;
