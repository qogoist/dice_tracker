import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSettings } from "../contexts/SettingsContext";
import Card from "./Card";
import DangerModal from "./DangerModal";
import DicePicker from "./DicePicker";
import Divider from "./Divider";
import SortPicker from "./SortPicker";

type Danger = {
  type: "Delete Account" | "Reset Data";
  message: string;
};

const Settings: React.FC = () => {
  const { settings, saveSettings } = useSettings();
  const { resetData, deleteAccount } = useAuth();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saving, setSaving] = useState<boolean>(false);
  const [danger, setDanger] = useState<Danger | undefined>(undefined);

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

  const handleDelete = () => {
    setDanger({
      type: "Delete Account",
      message:
        "You are about to delete your account. This will delete all your data on our servers and cannot be undone. Do you want to proceed?",
    });
  };

  const confirmDelete = () => {
    //TODO: Reauthenticate user https://firebase.google.com/docs/auth/web/manage-users?hl=en#re-authenticate_a_user
    console.log("Confirming", danger?.type);

    if (!danger) return;

    if (danger.type === "Reset Data") resetData();
    if (danger.type === "Delete Account") deleteAccount();

    setDanger(undefined);
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

      {/* <Divider />

      <Card className="full-width">
        <h2>Danger Zone</h2>
        <div className="equal-buttons">
          <button
            className="btn btn-danger"
            title="Permanently delete your account."
            onClick={handleDelete}
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
      /> */}
    </div>
  );
};

export default Settings;
