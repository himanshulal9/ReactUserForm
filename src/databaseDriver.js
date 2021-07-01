import { db } from "./firebase";
const collectionName = "users";

// adding data to firebase
export const AddData = (data) => db.collection(collectionName).add(data);

//get realtime updated snapshort
export const getSnapUpdate = ({ fx_RunOnUpdata }) =>
  db.collection(collectionName).onSnapshot((realTimeData) => fx_RunOnUpdata);

//getting data form firebase
export const GetFirebaseData = ({ setUploadedData }) => {
  const array = [];
  let item;
  db.collection(collectionName)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        item = doc.data();
        item.id = doc.id;
        array.push(item);
      });
      setUploadedData(array);
    });
};

export const deleteFirebaseItem = (id) => {
  db.collection(collectionName).doc(id).delete();
};
