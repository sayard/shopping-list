import AuthStore from "../Auth";
import ProductsStore from "../Products";
// eslint-disable-next-line import/no-cycle
import { Stores } from "./types";

export default class RootStore {
  auth: AuthStore;

  products: ProductsStore;

  constructor() {
    this.auth = new AuthStore(this);
    this.products = new ProductsStore(this);
  }

  get stores(): Stores {
    return {
      root: this,
      auth: this.auth,
      products: this.products,
    };
  }
}
