import { UserDetails, UserUid } from "../stores/Auth/types";
import { Product } from "../stores/Products/types";
import Firebase from "./Firebase";

const firestore = Firebase.firestore();
const realTimeDb = Firebase.database();

class API {
  static async getUserDetails(
    userUid: UserUid
  ): Promise<UserDetails | null | undefined> {
    let userDetails: UserDetails | null | undefined;

    const querySnapshot = await firestore.collection("usersDetails").get();
    // eslint-disable-next-line
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      if (data.userUID === userUid) {
        userDetails = data as UserDetails;
      }
    });

    return userDetails;
  }

  static async addProduct(product: Product): Promise<void> {
    const { uid, ...data } = product;
    await realTimeDb.ref(`products/${uid}/`).set({ ...data });
  }

  static async removeProduct(uid: string): Promise<void> {
    await realTimeDb.ref(`products/${uid}/`).remove();
  }
}

export default API;
