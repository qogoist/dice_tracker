import { db } from "../firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

export const getAllSessions = (user: any, observer: any) => {
  const unsub = onSnapshot(collection(db, "users", user.uid, "sessions"), observer);

  return unsub;
};

export const addSession = async (user: any, data: any): Promise<any> => {
  try {
    const session = data;
    const docRef = await addDoc(collection(db, "users", user.uid, "sessions"), session);
    console.log("Document written with ID: " + docRef.id);
  } catch (error: any) {
    throw new Error(error);
  }
};
