import { db } from "../firebase";
import { collection, onSnapshot, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";

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

export const updateSession = async (user: any, session: any): Promise<any> => {
  try {
    const data = { ...session };
    delete data._id;

    const docRef = await setDoc(doc(db, "users", user.uid, "sessions", session._id), data);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteSession = async (user: any, id: string): Promise<any> => {
  try {
    await deleteDoc(doc(db, "users", user.uid, "sessions", id));
  } catch (error: any) {
    throw new Error(error);
  }
};
