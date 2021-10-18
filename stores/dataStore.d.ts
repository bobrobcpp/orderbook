import { observable } from "mobx"
export interface Data {
  bids?: IObservableArray<any>;
  asks?: IObservableArray<any>;
  feed?: string;
}