import { db } from "@/plugins/firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

export const getUsers = async () => {
  const users = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => users.push({ ...doc.data() }));

  return users;
};

export const updateUserCollection = async (user) => {
  try {
    await setDoc(doc(db, "users", user.id), user);
  } catch (e) {
    console.error("Error updating user: ", e);
  }
};
