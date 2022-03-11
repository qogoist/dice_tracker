import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const uploadSettings = async (user: any, settings: Settings) => {
  try {
    const docRef = await setDoc(doc(db, "users", user.uid, "details", "settings"), settings);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSettings = async (user: any) => {
  try {
    const docSnap = await getDoc(doc(db, "users", user.uid, "details", "settings"));

    if (docSnap) return docSnap.data();
    else throw new Error("No setting data found");
  } catch (error: any) {
    throw new Error(error);
  }
};
