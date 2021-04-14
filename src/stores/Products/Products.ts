import { action, makeObservable, observable, runInAction } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { NewProductFormInputs } from "../../components/NewProductDialog/types";
import API from "../../utils/api";
import RootStore from "../Root";
import { Product } from "./types";

export default class ProductsStore {
  store: RootStore;

  isLoading = false;

  isLoaded = false;

  error?: Error;

  items: Product[] = [];

  constructor(store: RootStore) {
    this.store = store;

    makeObservable(this, {
      isLoading: observable,
      error: observable,
      items: observable,
      loadProducts: action.bound,
      addProduct: action.bound,
      removeProduct: action.bound,
    });
  }

  async loadProducts(): Promise<void> {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const products = await API.getProducts();
      runInAction(() => {
        this.items = products;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
        this.isLoaded = true;
      });
    }
  }

  async addProduct(data: NewProductFormInputs): Promise<void> {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const product = {
        ...data,
        uid: uuidv4(),
        addedBy: this.store.auth.userDetails.nickname as string,
        notes: data.notes ? data.notes : "",
      };
      await API.addProduct(product);
      const updatedItems = [...this.items, product];
      runInAction(() => {
        this.items = updatedItems;
      });
    } catch (e) {
      this.error = e;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
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
      });
    } catch (e) {
      this.error = e;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
