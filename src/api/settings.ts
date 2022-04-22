import { User } from "firebase/auth";
import { setDoc, doc, getDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export const uploadSettings = async (user: User, settings: Settings) => {
  try {
    const docRef = await setDoc(doc(db, "users", user.uid, "details", "settings"), settings);
    return docRef;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSettings = async (user: User) => {
  try {
    const docSnap = await getDoc(doc(db, "users", user.uid, "details", "settings"));

    if (docSnap) return docSnap.data();
    else throw new Error("No setting data found");
  } catch (error: any) {
    throw new Error(error);
  }
};

export const resetSettings = async (user: User) => {
  try {
    const settings = await getDocs(collection(db, "users", user.uid, "details"));

    settings.docs.map(doc => {
      deleteDoc(doc.ref);
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
