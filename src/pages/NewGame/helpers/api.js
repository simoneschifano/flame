import { db } from "@/plugins/firebase";
import { setDoc, doc, runTransaction } from "firebase/firestore";
import { generateRoomId, generateRoomObject } from "./utilities";
import { getRoomById } from "@/shared/helpers/api";
import { upsertById } from "@/shared/helpers/utilities";

export const getQuestions = async (category, difficulty) => {
  const queries = new URLSearchParams({
    difficulty,
    category,
    amount: 1,
    type: "multiple",
  });

  const response = await fetch(
    `https://opentdb.com/api.php?${queries.toString()}`
  );
  const data = await response.json();
  return data.results;
};

export const createNewRoom = async () => {
  let generatedId = generateRoomId();
  let room = await getRoomById(generatedId);

  while (room) {
    generatedId = generateRoomId();
    room = await getRoomById(generatedId);
  }

  const roomRef = doc(db, "rooms", generatedId);

  try {
    await setDoc(roomRef, generateRoomObject(generatedId));
    return roomRef.id;
  } catch (error) {
    console.error("Error creating new document:", error);
    return null;
  }
};

export const updateRoomUser = async (roomId, user) => {
  const roomRef = doc(db, "rooms", roomId);

  try {
    await runTransaction(db, async (transaction) => {
      const roomDoc = await transaction.get(roomRef);
      if (!roomDoc.exists()) throw "Room does not exist";

      const newUsersList = upsertById(roomDoc.data().users, user);
      transaction.update(roomRef, { users: newUsersList });
    });
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
};
