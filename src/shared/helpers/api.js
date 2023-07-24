import { generateUser } from "@/pages/NewGame/helpers/utilities";
import { db } from "@/plugins/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const getUsers = async () => {
  const users = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => users.push({ ...doc.data() }));

  return users;
};

export const addUser = async (username, avatarId) => {
  try {
    await addDoc(collection(db, "users"), generateUser(username, avatarId));
  } catch (e) {
    console.error("Error adding user: ", e);
  }
};
