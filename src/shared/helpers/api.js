import { db } from "@/plugins/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getRoomById = async (id) => {
  const roomRef = doc(db, "rooms", id);
  const roomSnapshot = await getDoc(roomRef);
  return roomSnapshot.data();
};
