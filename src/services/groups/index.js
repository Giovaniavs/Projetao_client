import { db } from "../../firebase";

export const getGroups = async () => {
  let groupList = [];
  await db
    .collection("groups")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        groupList = [...groupList, { id: doc.id, ...doc.data() }];
      });
    });
  return groupList;
};
