import { UserDetails, UserUid } from "../stores/Auth/types";
import { Product } from "../stores/Products/types";
import Firebase from "./Firebase";

const db = Firebase.firestore();

class API {
  static async getUserDetails(
    userUid: UserUid
  ): Promise<UserDetails | null | undefined> {
    let userDetails: UserDetails | null | undefined;

    const querySnapshot = await db.collection("usersDetails").get();
    // eslint-disable-next-line
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      if (data.userUID === userUid) {
        userDetails = data as UserDetails;
      }
    });

    return userDetails;
  }

  static async getProducts(): Promise<Product[]> {
    const products: Product[] = [];

    const querySnapshot = await db.collection("products").get();
    // eslint-disable-next-line
    querySnapshot.forEach((doc: any) => {
      const data = doc.data() as Product;
      products.push({ ...data, uid: doc.id });
    });

    return products;
  }

  static async addProduct(product: Product): Promise<void> {
    const { uid, ...data } = product;
    db.collection("products")
      .doc(uid)
      .set({
        ...data,
      });
  }

  static async removeProduct(uid: string): Promise<void> {
    db.collection("products").doc(uid).delete();
  }
}

export default API;
