import AuthStore from "../Auth";
import ProductsStore from "../Products";
// eslint-disable-next-line import/no-cycle
import RootStore from "./Root";

export interface Stores {
  root: RootStore;
  auth: AuthStore;
  products: ProductsStore;
}
