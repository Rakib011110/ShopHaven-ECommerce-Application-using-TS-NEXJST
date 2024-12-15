export type TResponseRedux = {
  reduce(arg0: (acc: any, item: any) => any, arg1: number): unknown;
  data: any;
  status: string;
  error?: string;
  map?: any;
  slice: any;
  length?: any;
  filter?: any;
  find?: any;
};

export type TQueryParam = {
  [key: string]: any;
};
export interface IProduct {
  save(): unknown;
  _id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  imageUrl: string;
  rating: number;
}
