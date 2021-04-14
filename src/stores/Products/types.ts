export interface Product {
  uid: string;
  addedBy: string;
  name: string;
  notes: string;
  quantity: number;
}

export interface ProductsData {
  [key: string]: Omit<Product, "uid">;
}
