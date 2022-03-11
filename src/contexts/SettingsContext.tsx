import { createContext, useContext, useEffect, useState } from "react";
import { uploadSettings, getSettings } from "../api/settings";
import { useAuth } from "./AuthContext";

export type ISettingsContext = {
  settings: Settings;
  saveSettings: (settings: Settings) => void;
  fetchSettings: () => void;
};

export const SettingsContext = createContext<ISettingsContext | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (context === undefined) throw new Error("Context not defined");

  return context;
};

export const SettingsProvider: React.FC = ({ children }) => {
  const { currentUser } = useAuth();
  const [settings, setSettings] = useState<Settings>({
    preferredDice: [],
    diceSort: "desc",
    sessionSort: "latest",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const saveSettings = async (settings: Settings) => {
    setSettings(settings);
    await uploadSettings(currentUser, settings);
  };

  async function fetchSettings() {
    const set = await getSettings(currentUser);

    setSettings(set as Settings);
  }

  const value: ISettingsContext = {
    settings,
    saveSettings,
    fetchSettings,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
