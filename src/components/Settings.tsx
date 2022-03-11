import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../contexts/SettingsContext";
import Card from "./Card";
import DicePicker from "./DicePicker";

const Settings: React.FC = () => {
  const { settings, saveSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saving, setSaving] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleDice = (die: Dice, checked: boolean) => {
    if (!localSettings || !settings) return false;

    let dice = [...localSettings.preferredDice];

    if (checked) dice.push(die);
    else dice.splice(dice.indexOf(die), 1);

    setLocalSettings({
      ...settings,
      preferredDice: dice,
    });

    return true;
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
      <Card className="full-width">
        <h2>Standard Sorting Method</h2>
      </Card>
      <button className="btn full-width" onClick={handleSave}>
        {saving ? "Saving..." : "Save Settings"}
      </button>

      {/* <Card className="full-width">
        <h2>Delete Account</h2>
      </Card> */}
    </div>
  );
};

export default Settings;
