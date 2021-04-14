import { action, makeObservable, observable, runInAction } from "mobx";
import API from "../../utils/api";
import Firebase from "../../utils/Firebase";
import RootStore from "../Root";
import { Product, ProductsData } from "./types";

export default class ProductsStore {
  store: RootStore;

  isLoading = false;

  isLoaded = false;

  error?: Error;

  items: Product[] = [];

  constructor(store: RootStore) {
    this.store = store;

    this.registerObservers();

    makeObservable(this, {
      isLoading: observable,
      error: observable,
      items: observable,
      removeProduct: action.bound,
    });
  }

  registerObservers(): void {
    this.isLoading = true;
    Firebase.database()
      .ref("/products/")
      .on("value", (snapshot) => {
        const data: ProductsData = snapshot.val();
        if (!data) {
          this.items = [];
          return;
        }
        const newProducts = Object.entries(data).map(([key, productData]) => {
          return {
            uid: key,
            ...productData,
          };
        });
        this.items = newProducts;
      });
    this.isLoading = false;
  }

  async removeProduct(uid: string): Promise<void> {
    try {
      runInAction(() => {
        this.isLoading = true;
      });

      await API.removeProduct(uid);

      const updatedItems = this.items;
      updatedItems.splice(
        this.items.findIndex((product) => product.uid === uid),
        1
      );
      runInAction(() => {
        this.items = updatedItems;
        console.log(this.items);
      });
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
