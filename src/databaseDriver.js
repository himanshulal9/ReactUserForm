import { db } from "./firebase";

//adding data
const addUser = async (user) => {
  try {
    const userRef = await db.collection("users").add(user);
    console.log("Document written with ID: ", userRef.id);
    return userRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

const getUsers = () => {
  try {
    db.collection("users")
      .get()
      .then((data) => console.log("addedDAta", data));
  } catch (e) {
    console.log("Error while getting data", e);
  }
};

export { addUser, getUsers };
